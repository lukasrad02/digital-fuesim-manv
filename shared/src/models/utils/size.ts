import { IsNumber /* , IsPositive */ } from 'class-validator';
import { getCreate } from './get-create';

export class Size {
    /**
     * The width in meters.
     */
    // @IsPositive()
    @IsNumber()
    public readonly width: number;

    /**
     * The height in meters.
     */
    // @IsPositive()
    @IsNumber()
    public readonly height: number;

    /**
     * @deprecated Use {@link create} instead
     */
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    static readonly create = getCreate(this);
}
