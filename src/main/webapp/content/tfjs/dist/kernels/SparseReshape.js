/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import { backend_util, SparseReshape, util } from '@tensorflow/tfjs-core';
let wasmSparseReshape;
function setup(backend) {
  wasmSparseReshape = backend.wasm.cwrap(SparseReshape, null /*void*/, [
    'number',
    'number',
    'number',
    'number',
    'number',
    'number',
    'number', // exceptionValuesId
  ]);
}
function sparseReshape(args) {
  const { backend, inputs } = args;
  const { inputIndices, inputShape, newShape } = inputs;
  if (inputIndices.shape.length !== 2) {
    throw new Error(`Input indices should be a matrix but received shape
        ${inputIndices.shape}`);
  }
  if (inputShape.shape.length !== 1) {
    throw new Error(`Input shape should be a vector but received shape
        ${inputShape.shape}`);
  }
  if (newShape.shape.length !== 1) {
    throw new Error(`Target shape should be a vector but received shape ${newShape.shape}`);
  }
  const inputIndicesId = backend.dataIdMap.get(inputIndices.dataId).id;
  const inputShapeId = backend.dataIdMap.get(inputShape.dataId).id;
  const newShapeId = backend.dataIdMap.get(newShape.dataId).id;
  const nnz = inputIndices.shape[0];
  const outputRank = util.sizeFromShape(newShape.shape);
  const newIndices = backend.makeOutput([nnz, outputRank], inputIndices.dtype);
  const newIndicesId = backend.dataIdMap.get(newIndices.dataId).id;
  const outputShape = backend.makeOutput([outputRank], newShape.dtype);
  const outputShapeId = backend.dataIdMap.get(outputShape.dataId).id;
  const exceptionValues = backend.makeOutput([3], 'int32');
  const exceptionValuesId = backend.dataIdMap.get(exceptionValues.dataId).id;
  wasmSparseReshape(inputIndicesId, inputShapeId, newShapeId, nnz, newIndicesId, outputShapeId, exceptionValuesId);
  const exceptionValuesArray = backend.readSync(exceptionValues.dataId);
  let exceptionMessage;
  switch (exceptionValuesArray[0]) {
    case 0: {
      exceptionMessage = backend_util.getSparseReshapeMultipleNegativeOneOutputDimErrorMessage(
        exceptionValuesArray[1],
        exceptionValuesArray[2],
      );
      break;
    }
    case 1: {
      exceptionMessage = backend_util.getSparseReshapeNegativeOutputDimErrorMessage(exceptionValuesArray[1], exceptionValuesArray[2]);
      break;
    }
    case 2:
      exceptionMessage = backend_util.getSparseReshapeEmptyTensorZeroOutputDimErrorMessage();
      break;
    case 3: {
      const inputShapeValues = Array.from(backend.readSync(inputShape.dataId)),
        outputShapeValues = Array.from(backend.readSync(outputShape.dataId));
      exceptionMessage = backend_util.getSparseReshapeInputOutputMultipleErrorMessage(inputShapeValues, outputShapeValues);
      break;
    }
    case 4: {
      const inputShapeValues = Array.from(backend.readSync(inputShape.dataId)),
        outputShapeValues = Array.from(backend.readSync(outputShape.dataId));
      exceptionMessage = backend_util.getSparseReshapeInputOutputMismatchErrorMessage(inputShapeValues, outputShapeValues);
      break;
    }
    default:
      exceptionMessage = '';
  }
  backend.disposeData(exceptionValues.dataId);
  if (exceptionMessage) {
    backend.disposeData(newIndices.dataId);
    backend.disposeData(outputShape.dataId);
    throw new Error(exceptionMessage);
  }
  return [newIndices, outputShape];
}
export const sparseReshapeConfig = {
  kernelName: SparseReshape,
  backendName: 'wasm',
  setupFunc: setup,
  kernelFunc: sparseReshape,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BhcnNlUmVzaGFwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3RmanMtYmFja2VuZC13YXNtL3NyYy9rZXJuZWxzL1NwYXJzZVJlc2hhcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBNEIsYUFBYSxFQUFtQyxJQUFJLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUluSSxJQUFJLGlCQUdrQyxDQUFDO0FBRXZDLFNBQVMsS0FBSyxDQUFDLE9BQW9CO0lBQ2pDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQ25FLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVE7UUFDUixRQUFRO1FBQ1IsUUFBUTtRQUNSLFFBQVEsRUFBRyxvQkFBb0I7S0FDaEMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMsYUFBYSxDQUFDLElBR3RCO0lBQ0MsTUFBTSxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUMsR0FBRyxJQUFJLENBQUM7SUFDL0IsTUFBTSxFQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLEdBQUcsTUFBTSxDQUFDO0lBRXBELElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUM7VUFDVixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztLQUM3QjtJQUNELElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUM7VUFDVixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztLQUMzQjtJQUNELElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxF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RUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQzdDLE1BQU07U0FDUDtRQUNELEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDTixNQUFNLGdCQUFnQixHQUNsQixLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBZSxDQUFDLEVBQzNELGlCQUFpQixHQUNiLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFlLENBQUMsQ0FBQztZQUN6RSxnQkFBZ0I7Z0JBQ1osWUFBWSxDQUFDLCtDQUErQyxDQUN4RCxnQkFBZ0IsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQzdDLE1BQU07U0FDUDtRQUNEO1lBQ0UsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0tBQ3pCO0lBRUQsT0FBTyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsSUFBSSxnQkFBZ0IsRUFBRTtRQUNwQixPQUFPLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7S0FDbkM7SUFFRCxPQUFPLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBaUI7SUFDL0MsVUFBVSxFQUFFLGFBQWE7SUFDekIsV0FBVyxFQUFFLE1BQU07SUFDbkIsU0FBUyxFQUFFLEtBQUs7SUFDaEIsVUFBVSxFQUFFLGFBQXNDO0NBQ25ELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMSBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCB7YmFja2VuZF91dGlsLCBLZXJuZWxDb25maWcsIEtlcm5lbEZ1bmMsIFNwYXJzZVJlc2hhcGUsIFNwYXJzZVJlc2hhcGVJbnB1dHMsIFRlbnNvckluZm8sIHV0aWx9IGZyb20gJ0B0ZW5zb3JmbG93L3RmanMtY29yZSc7XG5cbmltcG9ydCB7QmFja2VuZFdhc219IGZyb20gJy4uL2JhY2tlbmRfd2FzbSc7XG5cbmxldCB3YXNtU3BhcnNlUmVzaGFwZTogKFxuICAgIGlucHV0SW5kaWNlc0lkOiBudW1iZXIsIGlucHV0U2hhcGVJZDogbnVtYmVyLCBuZXdTaGFwZUlkOiBudW1iZXIsXG4gICAgbm56OiBudW1iZXIsIG5ld0luZGljZXNJZDogbnVtYmVyLCBvdXRwdXRTaGFwZUlkOiBudW1iZXIsXG4gICAgZXhjZXB0aW9uVmFsdWVzSWQ6IG51bWJlcikgPT4gdm9pZDtcblxuZnVuY3Rpb24gc2V0dXAoYmFja2VuZDogQmFja2VuZFdhc20pOiB2b2lkIHtcbiAgd2FzbVNwYXJzZVJlc2hhcGUgPSBiYWNrZW5kLndhc20uY3dyYXAoU3BhcnNlUmVzaGFwZSwgbnVsbCAvKnZvaWQqLywgW1xuICAgICdudW1iZXInLCAgLy8gaW5wdXRJbmRpY2VzSWRcbiAgICAnbnVtYmVyJywgIC8vIGlucHV0U2hhcGVJZFxuICAgICdudW1iZXInLCAgLy8gbmV3U2hhcGVJZFxuICAgICdudW1iZXInLCAgLy8gbm56XG4gICAgJ251bWJlcicsICAvLyBuZXdJbmRpY2VzSWRcbiAgICAnbnVtYmVyJywgIC8vIG91dHB1dFNoYXBlSWRcbiAgICAnbnVtYmVyJywgIC8vIGV4Y2VwdGlvblZhbHVlc0lkXG4gIF0pO1xufVxuXG5mdW5jdGlvbiBzcGFyc2VSZXNoYXBlKGFyZ3M6IHtcbiAgYmFja2VuZDogQmFja2VuZFdhc20sXG4gIGlucHV0czogU3BhcnNlUmVzaGFwZUlucHV0cyxcbn0pOiBbVGVuc29ySW5mbywgVGVuc29ySW5mb10ge1xuICBjb25zdCB7YmFja2VuZCwgaW5wdXRzfSA9IGFyZ3M7XG4gIGNvbnN0IHtpbnB1dEluZGljZXMsIGlucHV0U2hhcGUsIG5ld1NoYXBlfSA9IGlucHV0cztcblxuICBpZiAoaW5wdXRJbmRpY2VzLnNoYXBlLmxlbmd0aCAhPT0gMikge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW5wdXQgaW5kaWNlcyBzaG91bGQgYmUgYSBtYXRyaXggYnV0IHJlY2VpdmVkIHNoYXBlXG4gICAgICAgICR7aW5wdXRJbmRpY2VzLnNoYXBlfWApO1xuICB9XG4gIGlmIChpbnB1dFNoYXBlLnNoYXBlLmxlbmd0aCAhPT0gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgSW5wdXQgc2hhcGUgc2hvdWxkIGJlIGEgdmVjdG9yIGJ1dCByZWNlaXZlZCBzaGFwZVxuICAgICAgICAke2lucHV0U2hhcGUuc2hhcGV9YCk7XG4gIH1cbiAgaWYgKG5ld1NoYXBlLnNoYXBlLmxlbmd0aCAhPT0gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFRhcmdldCBzaGFwZSBzaG91bGQgYmUgYSB2ZWN0b3IgYnV0IHJlY2VpdmVkIHNoYXBlICR7bmV3U2hhcGUuc2hhcGV9YCk7XG4gIH1cblxuICBjb25zdCBpbnB1dEluZGljZXNJZCA9IGJhY2tlbmQuZGF0YUlkTWFwLmdldChpbnB1dEluZGljZXMuZGF0YUlkKS5pZDtcbiAgY29uc3QgaW5wdXRTaGFwZUlkID0gYmFja2VuZC5kYXRhSWRNYXAuZ2V0KGlucHV0U2hhcGUuZGF0YUlkKS5pZDtcbiAgY29uc3QgbmV3U2hhcGVJZCA9IGJhY2tlbmQuZGF0YUlkTWFwLmdldChuZXdTaGFwZS5kYXRhSWQpLmlkO1xuXG4gIGNvbnN0IG5ueiA9IGlucHV0SW5kaWNlcy5zaGFwZVswXTtcbiAgY29uc3Qgb3V0cHV0UmFuayA9IHV0aWwuc2l6ZUZyb21TaGFwZShuZXdTaGFwZS5zaGFwZSk7XG5cbiAgY29uc3QgbmV3SW5kaWNlcyA9IGJhY2tlbmQubWFrZU91dHB1dChbbm56LCBvdXRwdXRSYW5rXSwgaW5wdXRJbmRpY2VzLmR0eXBlKTtcbiAgY29uc3QgbmV3SW5kaWNlc0lkID0gYmFja2VuZC5kYXRhSWRNYXAuZ2V0KG5ld0luZGljZXMuZGF0YUlkKS5pZDtcblxuICBjb25zdCBvdXRwdXRTaGFwZSA9IGJhY2tlbmQubWFrZU91dHB1dChbb3V0cHV0UmFua10sIG5ld1NoYXBlLmR0eXBlKTtcbiAgY29uc3Qgb3V0cHV0U2hhcGVJZCA9IGJhY2tlbmQuZGF0YUlkTWFwLmdldChvdXRwdXRTaGFwZS5kYXRhSWQpLmlkO1xuXG4gIGNvbnN0IGV4Y2VwdGlvblZhbHVlcyA9IGJhY2tlbmQubWFrZU91dHB1dChbM10sICdpbnQzMicpO1xuICBjb25zdCBleGNlcHRpb25WYWx1ZXNJZCA9IGJhY2tlbmQuZGF0YUlkTWFwLmdldChleGNlcHRpb25WYWx1ZXMuZGF0YUlkKS5pZDtcblxuICB3YXNtU3BhcnNlUmVzaGFwZShcbiAgICAgIGlucHV0SW5kaWNlc0lkLCBpbnB1dFNoYXBlSWQsIG5ld1NoYXBlSWQsIG5ueiwgbmV3SW5kaWNlc0lkLFxuICAgICAgb3V0cHV0U2hhcGVJZCwgZXhjZXB0aW9uVmFsdWVzSWQpO1xuXG4gIGNvbnN0IGV4Y2VwdGlvblZhbHVlc0FycmF5ID1cbiAgICAgIGJhY2tlbmQucmVhZFN5bmMoZXhjZXB0aW9uVmFsdWVzLmRhdGFJZCkgYXMgSW50MzJBcnJheTtcblxuICBsZXQgZXhjZXB0aW9uTWVzc2FnZTogc3RyaW5nO1xuICBzd2l0Y2ggKGV4Y2VwdGlvblZhbHVlc0FycmF5WzBdKSB7XG4gICAgY2FzZSAwOiB7XG4gICAgICBleGNlcHRpb25NZXNzYWdlID1cbiAgICAgICAgICBiYWNrZW5kX3V0aWwuZ2V0U3BhcnNlUmVzaGFwZU11bHRpcGxlTmVnYXRpdmVPbmVPdXRwdXREaW1FcnJvck1lc3NhZ2UoXG4gICAgICAgICAgICAgIGV4Y2VwdGlvblZhbHVlc0FycmF5WzFdLCBleGNlcHRpb25WYWx1ZXNBcnJheVsyXSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSAxOiB7XG4gICAgICBleGNlcHRpb25NZXNzYWdlID1cbiAgICAgICAgICBiYWNrZW5kX3V0aWwuZ2V0U3BhcnNlUmVzaGFwZU5lZ2F0aXZlT3V0cHV0RGltRXJyb3JNZXNzYWdlKFxuICAgICAgICAgICAgICBleGNlcHRpb25WYWx1ZXNBcnJheVsxXSwgZXhjZXB0aW9uVmFsdWVzQXJyYXlbMl0pO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgMjpcbiAgICAgIGV4Y2VwdGlvbk1lc3NhZ2UgPVxuICAgICAgICAgIGJhY2tlbmRfdXRpbC5nZXRTcGFyc2VSZXNoYXBlRW1wdHlUZW5zb3JaZXJvT3V0cHV0RGltRXJyb3JNZXNzYWdlKCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDM6IHtcbiAgICAgIGNvbnN0IGlucHV0U2hhcGVWYWx1ZXMgPVxuICAgICAgICAgIEFycmF5LmZyb20oYmFja2VuZC5yZWFkU3luYyhpbnB1dFNoYXBlLmRhdGFJZCkgYXMgSW50MzJBcnJheSksXG4gICAgICAgICAgICBvdXRwdXRTaGFwZVZhbHVlcyA9XG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShiYWNrZW5kLnJlYWRTeW5jKG91dHB1dFNoYXBlLmRhdGFJZCkgYXMgSW50MzJBcnJheSk7XG4gICAgICBleGNlcHRpb25NZXNzYWdlID1cbiAgICAgICAgICBiYWNrZW5kX3V0aWwuZ2V0U3BhcnNlUmVzaGFwZUlucHV0T3V0cHV0TXVsdGlwbGVFcnJvck1lc3NhZ2UoXG4gICAgICAgICAgICAgIGlucHV0U2hhcGVWYWx1ZXMsIG91dHB1dFNoYXBlVmFsdWVzKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIDQ6IHtcbiAgICAgIGNvbnN0IGlucHV0U2hhcGVWYWx1ZXMgPVxuICAgICAgICAgIEFycmF5LmZyb20oYmFja2VuZC5yZWFkU3luYyhpbnB1dFNoYXBlLmRhdGFJZCkgYXMgSW50MzJBcnJheSksXG4gICAgICAgICAgICBvdXRwdXRTaGFwZVZhbHVlcyA9XG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShiYWNrZW5kLnJlYWRTeW5jKG91dHB1dFNoYXBlLmRhdGFJZCkgYXMgSW50MzJBcnJheSk7XG4gICAgICBleGNlcHRpb25NZXNzYWdlID1cbiAgICAgICAgICBiYWNrZW5kX3V0aWwuZ2V0U3BhcnNlUmVzaGFwZUlucHV0T3V0cHV0TWlzbWF0Y2hFcnJvck1lc3NhZ2UoXG4gICAgICAgICAgICAgIGlucHV0U2hhcGVWYWx1ZXMsIG91dHB1dFNoYXBlVmFsdWVzKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgZXhjZXB0aW9uTWVzc2FnZSA9ICcnO1xuICB9XG5cbiAgYmFja2VuZC5kaXNwb3NlRGF0YShleGNlcHRpb25WYWx1ZXMuZGF0YUlkKTtcbiAgaWYgKGV4Y2VwdGlvbk1lc3NhZ2UpIHtcbiAgICBiYWNrZW5kLmRpc3Bvc2VEYXRhKG5ld0luZGljZXMuZGF0YUlkKTtcbiAgICBiYWNrZW5kLmRpc3Bvc2VEYXRhKG91dHB1dFNoYXBlLmRhdGFJZCk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGV4Y2VwdGlvbk1lc3NhZ2UpO1xuICB9XG5cbiAgcmV0dXJuIFtuZXdJbmRpY2VzLCBvdXRwdXRTaGFwZV07XG59XG5cbmV4cG9ydCBjb25zdCBzcGFyc2VSZXNoYXBlQ29uZmlnOiBLZXJuZWxDb25maWcgPSB7XG4gIGtlcm5lbE5hbWU6IFNwYXJzZVJlc2hhcGUsXG4gIGJhY2tlbmROYW1lOiAnd2FzbScsXG4gIHNldHVwRnVuYzogc2V0dXAsXG4gIGtlcm5lbEZ1bmM6IHNwYXJzZVJlc2hhcGUgYXMgdW5rbm93biBhcyBLZXJuZWxGdW5jXG59O1xuIl19
