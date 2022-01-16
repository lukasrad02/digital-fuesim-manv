import { Viewport } from '..';
import type { ExerciseAction } from '.';
import { validateExerciseAction } from '.';

describe('validateExerciseAction', () => {
    it('should accept a valid action object', () => {
        expect(
            validateExerciseAction({
                type: '[Viewport] Remove viewport',
                viewportId: 'b02c7756-ea52-427f-9fc3-0e163799544d',
            })
        ).toEqual([]);
        expect(
            validateExerciseAction({
                type: '[Viewport] Add viewport',
                viewport: new Viewport(
                    {
                        x: 0,
                        y: 0,
                    },
                    {
                        height: 0,
                        width: 0,
                    },
                    ''
                ),
            })
        ).toEqual([]);
    });

    it("should reject everything that isn't an action object", () => {
        expect(validateExerciseAction(2 as any)).not.toEqual([]);
        expect(validateExerciseAction(true as any)).not.toEqual([]);
        expect(validateExerciseAction(Error('anything') as any)).not.toEqual(
            []
        );
        expect(validateExerciseAction({} as any)).not.toEqual([]);
        expect(validateExerciseAction([] as any)).not.toEqual([]);
    });

    it('should reject an action object with an invalid type', () => {
        expect(validateExerciseAction({ type: 'a' } as any)).not.toEqual([]);
        expect(
            // there is a typo in the type
            validateExerciseAction({ type: '[Viewport] AddViewport' } as any)
        ).not.toEqual([]);
    });

    it('should reject an invalid action object', () => {
        expect(
            validateExerciseAction({
                type: '[Viewport] Remove viewport',
                // missing viewportId
            } as ExerciseAction)
        ).toEqual([
            {
                target: {
                    type: '[Viewport] Remove viewport',
                    viewportId: undefined,
                },
                value: undefined,
                property: 'viewportId',
                children: [],
                constraints: { isUuid: "Got malformed id: 'undefined'." },
            },
        ]);

        expect(
            validateExerciseAction({
                type: '[Viewport] Add viewport',
                viewport: {
                    id: 'b02c7756-ea52-427f-9fc3-0e163799544d',
                    name: '',
                    size: {
                        height: 0,
                        width: 0,
                    },
                    topLeft: {
                        // this is of type string instead of number
                        x: '0' as unknown as number,
                        y: 0,
                    },
                },
            })
        ).not.toEqual([]);
    });
});
