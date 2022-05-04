import { Type } from 'class-transformer';
import { IsString, IsUUID, ValidateNested } from 'class-validator';
import { Position } from '../../models/utils';
import { uuidValidationOptions, UUID } from '../../utils';
import type { Action, ActionReducer } from '../action-reducer';
import { calculateTreatments } from './utils/calculate-treatments';
import { getElement } from './utils/get-element';
import { transferElement } from './utils/transfer-element';

export class MovePersonnelAction implements Action {
    @IsString()
    public readonly type = '[Personnel] Move personnel';

    @IsUUID(4, uuidValidationOptions)
    public readonly personnelId!: UUID;

    @ValidateNested()
    @Type(() => Position)
    public readonly targetPosition!: Position;
}

export class TransferPersonnelAction implements Action {
    @IsString()
    public readonly type = '[Personnel] Transfer personnel';

    @IsUUID(4, uuidValidationOptions)
    public readonly personnelId!: UUID;

    @IsUUID(4, uuidValidationOptions)
    public readonly startTransferPointId!: UUID;

    @IsUUID(4, uuidValidationOptions)
    public readonly targetTransferPointId!: UUID;
}

export namespace PersonnelActionReducers {
    export const movePersonnel: ActionReducer<MovePersonnelAction> = {
        action: MovePersonnelAction,
        reducer: (draftState, { personnelId, targetPosition }) => {
            const personnel = getElement(draftState, 'personnel', personnelId);
            personnel.position = targetPosition;
            calculateTreatments(draftState);
            return draftState;
        },
        rights: 'participant',
    };

    export const transferPersonnel: ActionReducer<TransferPersonnelAction> = {
        action: TransferPersonnelAction,
        reducer: (
            draftState,
            { personnelId, startTransferPointId, targetTransferPointId }
        ) => {
            const personnel = getElement(draftState, 'personnel', personnelId);
            transferElement(
                draftState,
                personnel,
                startTransferPointId,
                targetTransferPointId
            );
            return draftState;
        },
        rights: 'participant',
    };
}