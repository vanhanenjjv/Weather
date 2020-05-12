export default class Activator {
  static createInstance<T extends Function>(ctor: T): T {
    /* Dangerous because it lets you instantiate objects without having to pass
       parameters to the constructor. This can lead to unexpected behaviour as
       the instantiated object's properties that are expected to have values
       can be undefined.
    */
    return new (ctor as any)();
  }
}
