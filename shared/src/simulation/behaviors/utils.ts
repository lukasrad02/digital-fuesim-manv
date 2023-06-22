import {
    ResourceRequestRadiogram,
    TransferCountsRadiogram,
} from '../../models/radiogram';
import type { ExerciseRadiogram } from '../../models/radiogram/exercise-radiogram';
import { MaterialCountRadiogram } from '../../models/radiogram/material-count-radiogram';
import { PatientCountRadiogram } from '../../models/radiogram/patient-count-radiogram';
import { PersonnelCountRadiogram } from '../../models/radiogram/personnel-count-radiogram';
import type { ExerciseRadiogramStatus } from '../../models/radiogram/status/exercise-radiogram-status';
import { TransferConnectionsRadiogram } from '../../models/radiogram/transfer-connections-radiogram';
import { TreatmentStatusRadiogram } from '../../models/radiogram/treatment-status-radiogram';
import { VehicleCountRadiogram } from '../../models/radiogram/vehicle-count-radiogram';
import type { UUID } from '../../utils';
import { StrictObject } from '../../utils';
import type { AllowedValues } from '../../utils/validators';
import type { ExerciseSimulationBehaviorType } from './exercise-simulation-behavior';

export const reportableInformationAllowedValues: AllowedValues<ReportableInformation> =
    {
        materialCount: true,
        patientCount: true,
        personnelCount: true,
        requiredResources: true,
        singleRegionTransferCounts: true,
        transferConnections: true,
        transportManagementTransferCounts: true,
        treatmentStatus: true,
        vehicleCount: true,
    };

export const reportableInformations = StrictObject.keys(
    reportableInformationAllowedValues
);

export type ReportableInformation =
    | 'materialCount'
    | 'patientCount'
    | 'personnelCount'
    | 'requiredResources'
    | 'singleRegionTransferCounts'
    | 'transferConnections'
    | 'transportManagementTransferCounts'
    | 'treatmentStatus'
    | 'vehicleCount';

export const createRadiogramMap: {
    [Key in ReportableInformation]: (
        id: UUID,
        simulatedRegionId: UUID,
        key: string | null,
        status: ExerciseRadiogramStatus
    ) => ExerciseRadiogram;
} = {
    materialCount: MaterialCountRadiogram.create,
    patientCount: PatientCountRadiogram.create,
    personnelCount: PersonnelCountRadiogram.create,
    requiredResources: ResourceRequestRadiogram.create,
    singleRegionTransferCounts: TransferCountsRadiogram.create,
    transferConnections: TransferConnectionsRadiogram.create,
    transportManagementTransferCounts: TransferCountsRadiogram.create,
    treatmentStatus: TreatmentStatusRadiogram.create,
    vehicleCount: VehicleCountRadiogram.create,
};

export const behaviorTypeToGermanNameDictionary: {
    [Key in ExerciseSimulationBehaviorType]: string;
} = {
    assignLeaderBehavior: 'Führung zuweisen',
    treatPatientsBehavior: 'Patienten behandeln',
    unloadArrivingVehiclesBehavior: 'Fahrzeuge entladen',
    reportBehavior: 'Berichte erstellen',
    providePersonnelBehavior: 'Personal nachfordern',
    answerRequestsBehavior: 'Fahrzeuganfragen beantworten',
    automaticallyDistributeVehiclesBehavior: 'Fahrzeuge verteilen',
    requestBehavior: 'Fahrzeuge anfordern',
    transferBehavior: 'Fahrzeuge versenden',
    transferToHospitalBehavior: 'Patienten abtransportieren',
    managePatientTransportToHospitalBehavior: 'Transportorganisation',
};

export const reportableInformationTypeToGermanNameDictionary: {
    [Key in ReportableInformation]: string;
} = {
    materialCount: 'Anzahl an Material',
    patientCount: 'Anzahl an Patienten',
    personnelCount: 'Anzahl an Rettungskräften',
    requiredResources: 'Aktuell benötigte Fahrzeuge',
    singleRegionTransferCounts:
        'Anzahl aus diesem Bereich in Krankenhäuser abtransportierter Patienten',
    transferConnections: 'Transferverbindungen',
    transportManagementTransferCounts:
        'Anzahl unter dieser Transportorganisation in Krankenhäuser abtransportierter Patienten',
    treatmentStatus: 'Behandlungsstatus',
    vehicleCount: 'Anzahl an Fahrzeugen',
};
