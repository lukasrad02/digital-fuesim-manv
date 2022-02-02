import type { Patient } from 'digital-fuesim-manv-shared';
import type Point from 'ol/geom/Point';
import type VectorLayer from 'ol/layer/Vector';
import type VectorSource from 'ol/source/Vector';
import type { ApiService } from 'src/app/core/api.service';
import type OlMap from 'ol/Map';
import type { WithPosition } from '../../utility/types/with-position';
import type { OpenPopup } from '../../utility/types/open-popup';
import { CommonFeatureManager } from './common-feature-manager';

export class PatientFeatureManager extends CommonFeatureManager<
    WithPosition<Patient>
> {
    constructor(
        olMap: OlMap,
        patientLayer: VectorLayer<VectorSource<Point>>,
        openPopup: OpenPopup,
        apiService: ApiService
    ) {
        super(
            olMap,
            patientLayer,
            {
                imageHeight: 80,
                imageUrl: './assets/patient.svg',
            },
            (targetPosition, patient) => {
                apiService.proposeAction({
                    type: '[Patient] Move patient',
                    patientId: patient.id,
                    targetPosition,
                });
            },
            openPopup
        );
    }
}
