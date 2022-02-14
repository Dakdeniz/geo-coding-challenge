import booleanIntersects from '@turf/boolean-intersects';
import circle from '@turf/circle';
import { FeatureCollection, Polygon, Point, Position } from '@vpriem/geojson';
import { GeosearchInterface } from './geosearch-interface';

export class Geosearch implements GeosearchInterface {
    /**
     * TODO: implement interface
     */

    data: FeatureCollection<Polygon | Point> = {
        type: 'FeatureCollection',
        features: [],
    };

    init(data: FeatureCollection<Polygon | Point>): Promise<void> {
        this.data = data;
        return Promise.resolve();
    }

    find(
        position: Position,
        radius: number
    ): Promise<FeatureCollection<Polygon | Point>> {
        // Create circle from position and radius. Turf.js accepts kilometers, miles as unit, convert to meters
        const searchCircle = circle(position, radius / 1000, {
            units: 'kilometers',
        });
        const filteredData: FeatureCollection<Polygon | Point> = {
            type: 'FeatureCollection',

            //Filter geometries in FeatureCollection (data) if they intersect with circle created by position and radius
            features: this.data.features.filter((feature) =>
                booleanIntersects(searchCircle, feature)
            ),
        };

        return new Promise<FeatureCollection<Polygon | Point>>(
            (resolve, reject) => {
                resolve(filteredData);
            }
        );
    }

    shutdown(): Promise<void> {
        this.data = {
            type: 'FeatureCollection',
            features: [],
        };
        return Promise.resolve();
    }
}
