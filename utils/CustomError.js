class CustomError {
  msg;
  status;
  constructor(statusArg,errMsg) {
    this.msg = errMsg;
    this.status = statusArg;
  }
}

module.exports = CustomError;
