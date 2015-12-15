class Path {
  constructor(name, from, to, func) {
    this.name = name;
    this.from = from;
    this.to = to;
    this.func = func;
  }

  go() {
    this.func.call(this, this.from, this.to);
  }
}
