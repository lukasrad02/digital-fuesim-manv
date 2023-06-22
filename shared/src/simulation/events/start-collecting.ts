import { IsString, ValidateIf } from 'class-validator';
import { getCreate } from '../../models/utils/get-create';
import { IsLiteralUnion, IsValue } from '../../utils/validators';
import {
    ReportableInformation,
    reportableInformationAllowedValues,
} from '../behaviors/utils';
import type { SimulationEvent } from './simulation-event';

export class StartCollectingInformationEvent implements SimulationEvent {
    @IsValue('startCollectingInformationEvent')
    readonly type = 'startCollectingInformationEvent';

    @IsLiteralUnion(reportableInformationAllowedValues)
    readonly informationType: ReportableInformation;

    @IsString()
    @ValidateIf((_, value) => value !== null)
    public readonly interfaceSignallerKey!: string | null;

    /**
     * @deprecated Use {@link create} instead.
     */
    constructor(
        informationType: ReportableInformation,
        interfaceSignallerKey: string | null = null
    ) {
        this.informationType = informationType;
        this.interfaceSignallerKey = interfaceSignallerKey;
    }

    static readonly create = getCreate(this);
}
