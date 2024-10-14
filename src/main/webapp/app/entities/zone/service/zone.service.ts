import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IZone, getZoneIdentifier } from '../zone.model';

export type EntityResponseType = HttpResponse<IZone>;
export type EntityArrayResponseType = HttpResponse<IZone[]>;

export interface ResizeBoxDTO {
  left: number;
  top: number;
  x: any;
  y: any;
}
@Injectable({ providedIn: 'root' })
export class ZoneService {
  protected resourceUrl: string;

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {
    this.resourceUrl = this.applicationConfigService.getEndpointFor('api/zones');
  }

  create(zone: IZone): Observable<EntityResponseType> {
    return this.http.post<IZone>(this.resourceUrl, zone, { observe: 'response' });
  }

  update(zone: IZone): Observable<EntityResponseType> {
    return this.http.put<IZone>(`${this.resourceUrl}`, zone, { observe: 'response' });
  }

  partialUpdate(zone: IZone): Observable<EntityResponseType> {
    return this.http.patch<IZone>(`${this.resourceUrl}/${getZoneIdentifier(zone) as number}`, zone, { observe: 'response' });
  }

  objectScaling(zone: ResizeBoxDTO, id: number): Observable<EntityResponseType> {
    // eslint-disable-next-line no-console
    return this.http.patch<IZone>(`${this.resourceUrl}/scaling/${id}`, zone, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IZone>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  find4ExamId(examid: number): Observable<EntityArrayResponseType> {
    return this.http.get<IZone[]>(`${this.resourceUrl}/byExam/${examid}`, { observe: 'response' });
  }

  countStudentResponseForZone(id: number): Observable<HttpResponse<number>> {
    return this.http.get<number>(`${this.resourceUrl}/studentAnswer/${id}`, { observe: 'response' });
  }

  countStudentResponseForExam(examid: number): Observable<HttpResponse<number>> {
    return this.http.get<number>(`${this.resourceUrl}/studentAnswer4exam/${examid}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IZone[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addZoneToCollectionIfMissing(zoneCollection: IZone[], ...zonesToCheck: (IZone | null | undefined)[]): IZone[] {
    const zones: IZone[] = zonesToCheck.filter(isPresent);
    if (zones.length > 0) {
      const zoneCollectionIdentifiers = zoneCollection.map(zoneItem => getZoneIdentifier(zoneItem)!);
      const zonesToAdd = zones.filter(zoneItem => {
        const zoneIdentifier = getZoneIdentifier(zoneItem);
        if (zoneIdentifier == null || zoneCollectionIdentifiers.includes(zoneIdentifier)) {
          return false;
        }
        zoneCollectionIdentifiers.push(zoneIdentifier);
        return true;
      });
      return [...zonesToAdd, ...zoneCollection];
    }
    return zoneCollection;
  }
}
