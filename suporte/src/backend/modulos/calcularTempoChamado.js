const MILISEGUNDOS_POR_HORA = 1000 * 60 * 60;
const MILISEGUNDOS_POR_MINUTO = 1000 * 60;

const calcularTempoChamado = (chamado) => {
  if (chamado.dataInicio && chamado.dataEncerramento) {
    const dataInicio = new Date(chamado.dataInicio);
    const dataEncerramento = new Date(chamado.dataEncerramento);

    const diferencaEmMilissegundos = dataEncerramento - dataInicio;
    const horas = Math.floor(diferencaEmMilissegundos / MILISEGUNDOS_POR_HORA);
    const minutos = Math.floor(
      (diferencaEmMilissegundos % MILISEGUNDOS_POR_HORA) / MILISEGUNDOS_POR_MINUTO
    );

    return `${horas}h:${minutos}min`;
  }

  return "";
};

module.exports = calcularTempoChamado;