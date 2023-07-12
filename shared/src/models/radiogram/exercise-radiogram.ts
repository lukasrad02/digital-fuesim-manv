import type { Type } from 'class-transformer';
import type { Constructor } from '../../utils';
import { MaterialCountRadiogram } from './material-count-radiogram';
import { MissingTransferConnectionRadiogram } from './missing-transfer-connection-radiogram';
import { PatientCountRadiogram } from './patient-count-radiogram';
import { PersonnelCountRadiogram } from './personnel-count-radiogram';
import { Radiogram } from './radiogram';
import { TreatmentStatusRadiogram } from './treatment-status-radiogram';
import { VehicleCountRadiogram } from './vehicle-count-radiogram';
import { ResourceRequestRadiogram } from './resource-request-radiogram';
import { TransferConnectionsRadiogram } from './transfer-connections-radiogram';
import { TransferCountsRadiogram } from './transfer-counts-radiogram';
import { TransferCategoryCompletedRadiogram } from './transfer-category-completed-radiogram';
import { NewPatientDataRequestedRadiogram } from './new-patient-data-requested-radiogram';
import { VehicleOccupationsRadiogram } from './vehicle-occupations-radiogram';

export const radiograms = {
    MaterialCountRadiogram,
    MissingTransferConnectionRadiogram,
    PatientCountRadiogram,
    PersonnelCountRadiogram,
    ResourceRequestRadiogram,
    TransferCategoryCompletedRadiogram,
    TransferConnectionsRadiogram,
    TransferCountsRadiogram,
    TreatmentStatusRadiogram,
    VehicleCountRadiogram,
    VehicleOccupationsRadiogram,
    NewPatientDataRequestedRadiogram,
};

export type ExerciseRadiogram = InstanceType<
    (typeof radiograms)[keyof typeof radiograms]
>;

type ExerciseRadiogramDictionary = {
    [Radiogram in ExerciseRadiogram as Radiogram['type']]: Constructor<Radiogram>;
};

export const radiogramDictionary: ExerciseRadiogramDictionary = {
    materialCountRadiogram: MaterialCountRadiogram,
    missingTransferConnectionRadiogram: MissingTransferConnectionRadiogram,
    patientCountRadiogram: PatientCountRadiogram,
    personnelCountRadiogram: PersonnelCountRadiogram,
    resourceRequestRadiogram: ResourceRequestRadiogram,
    transferCategoryCompletedRadiogram: TransferCategoryCompletedRadiogram,
    transferConnectionsRadiogram: TransferConnectionsRadiogram,
    transferCountsRadiogram: TransferCountsRadiogram,
    treatmentStatusRadiogram: TreatmentStatusRadiogram,
    vehicleCountRadiogram: VehicleCountRadiogram,
    vehicleOccupationsRadiogram: VehicleOccupationsRadiogram,
    newPatientDataRequestedRadiogram: NewPatientDataRequestedRadiogram,
};

export function getRadiogramConstructor(radiogram: ExerciseRadiogram) {
    return radiogramDictionary[radiogram.type];
}

export const radiogramTypeOptions: Parameters<typeof Type> = [
    () => Radiogram,
    {
        keepDiscriminatorProperty: true,
        discriminator: {
            property: 'type',
            subTypes: Object.entries(radiogramDictionary).map(
                ([name, value]) => ({ name, value })
            ),
        },
    },
];

export const radiogramTypeToGermanDictionary: {
    [Key in ExerciseRadiogram['type']]: string;
} = {
    materialCountRadiogram: 'Vorhandene Materialien',
    missingTransferConnectionRadiogram: 'Fehlende Verbindung',
    patientCountRadiogram: 'Meldung über Patientenanzahlen',
    personnelCountRadiogram: 'Personalstatus',
    resourceRequestRadiogram: 'Anfrage von Ressourcen',
    transferCategoryCompletedRadiogram: 'Transport für SK abgeschlossen',
    transferConnectionsRadiogram: 'Transferverbindungen',
    transferCountsRadiogram: 'Transportstatus',
    treatmentStatusRadiogram: 'Behandlungsphase',
    vehicleCountRadiogram: 'Meldung über Fahrzeuganzahlen',
    vehicleOccupationsRadiogram: 'Meldung über Fahrzeugnutzung',
    newPatientDataRequestedRadiogram: 'Anfrage nach Patientenzahlen',
};
