const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  nomeCliente: { type: String, required: true },
  itens: [String],
  total: Number
});

module.exports = mongoose.model('Pedido', PedidoSchema);
