export type PropType<TObj, TProp extends keyof TObj> = TObj[TProp]

type Optional<T, K> = { [P in Extract<keyof T, K>]?: T[P] }
export type WithOptional<T, K extends keyof T> = T extends never ? never : Omit<T, K> & Optional<T, K>

/**
 * For instance we have such interface
 *
 * ```
 * interface A {
 *   field?: number;
 * }
 * ```
 *
 * here in `object: A = {}` `field` can possibly be undefined.
 *
 * ```
 * let a: A = ...;
 *
 * if (!isPresent(a.field)) {
 *   return;
 * }
 *
 * // here a.field is A, but not A | undefined anymore
 * ```
 */
export const isPresent = <T>(x: T | null | undefined): x is T => x !== null && x !== undefined
