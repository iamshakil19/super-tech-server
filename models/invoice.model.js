const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema({
  invoiceNo: {
    type: Number,
  },
});

invoiceSchema.methods.logger = function () {
  console.log(`Data save for ${this.name}`);
};

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
