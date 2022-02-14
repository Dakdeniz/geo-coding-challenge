import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { FeatureCollection, Polygon, Position } from '@vpriem/geojson';
import { GeofenceInterface } from './geofence-interface';

export class Geofence implements GeofenceInterface {
    /**
     * TODO: implement interface
     */

    data: FeatureCollection<Polygon> = {
        type: 'FeatureCollection',
        features: [],
    };

    init(data: FeatureCollection<Polygon>): Promise<void> {
        this.data = data;
        return Promise.resolve();
    }

    set(position: Position): Promise<FeatureCollection<Polygon>> {
        const filteredCollection: FeatureCollection<Polygon> = {
            type: 'FeatureCollection',
            features: this.data.features.filter((poly) =>
                booleanPointInPolygon(position, poly)
            ),
        };
        return new Promise<FeatureCollection<Polygon>>((resolve, reject) => {
            resolve(filteredCollection);
        });
    }

    shutdown(): Promise<void> {
        this.data = {
            type: 'FeatureCollection',
            features: [],
        };
        return Promise.resolve();
    }
}
