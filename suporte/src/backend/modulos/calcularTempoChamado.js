const MILISEGUNDOS_POR_HORA = 1000 * 60 * 60;
const MILISEGUNDOS_POR_MINUTO = 1000 * 60;
const MILISEGUNDOS_POR_DIA = MILISEGUNDOS_POR_HORA * 24;

const calcularTempoChamado = (chamado) => {
  if (chamado.dataInicio && chamado.dataEncerramento) {
    let dataInicio = new Date(chamado.dataInicio);
    let dataEncerramento = new Date(chamado.dataEncerramento);

    let diferencaEmMilissegundos = 0;

    while (dataInicio < dataEncerramento) {
      const diaDaSemana = dataInicio.getDay();
      if (diaDaSemana !== 0 && diaDaSemana !== 6) {
        if (dataEncerramento - dataInicio > MILISEGUNDOS_POR_DIA) {
          diferencaEmMilissegundos += MILISEGUNDOS_POR_DIA;
          dataInicio.setTime(dataInicio.getTime() + MILISEGUNDOS_POR_DIA);
        } else {
          diferencaEmMilissegundos += dataEncerramento - dataInicio;
          dataInicio = dataEncerramento;
        }
      } else {
        dataInicio.setTime(dataInicio.getTime() + MILISEGUNDOS_POR_DIA);
      }
    }

    const horas = Math.floor(diferencaEmMilissegundos / MILISEGUNDOS_POR_HORA);
    const minutos = Math.floor(
      (diferencaEmMilissegundos % MILISEGUNDOS_POR_HORA) / MILISEGUNDOS_POR_MINUTO
    );

    return `${horas}h:${minutos}min`;
  }

  return "";
};

module.exports = calcularTempoChamado;