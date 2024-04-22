const MILISEGUNDOS_POR_HORA = 1000 * 60 * 60;
const MILISEGUNDOS_POR_MINUTO = 1000 * 60;

const calcularTempoChamado = (chamado) => {
  if (chamado.dataInicio && chamado.dataEncerramento) {
    let dataInicio = new Date(chamado.dataInicio);
    let dataEncerramento = new Date(chamado.dataEncerramento);

    let diferencaEmMilissegundos = 0;

    while (dataInicio < dataEncerramento) {
      const diaDaSemana = dataInicio.getDay();
      if (diaDaSemana !== 0 && diaDaSemana !== 6) {
        const inicioHorarioComercial = new Date(dataInicio);
        inicioHorarioComercial.setHours(8, 0, 0, 0);

        const fimHorarioComercial = new Date(dataInicio);
        fimHorarioComercial.setHours(18, 0, 0, 0);

        const inicioIntervalo = Math.max(dataInicio, inicioHorarioComercial);
        const fimIntervalo = Math.min(dataEncerramento, fimHorarioComercial);

        if (inicioIntervalo < fimIntervalo) {
          diferencaEmMilissegundos += fimIntervalo - inicioIntervalo;
        }
      }
      dataInicio.setDate(dataInicio.getDate() + 1);
      dataInicio.setHours(0, 0, 0, 0);
    }

    const horas = Math.floor(diferencaEmMilissegundos / MILISEGUNDOS_POR_HORA);
    const minutos = Math.floor(
      (diferencaEmMilissegundos % MILISEGUNDOS_POR_HORA) /
        MILISEGUNDOS_POR_MINUTO
    );

    return `${horas}h:${minutos}min`;
  }

  return "Data inválida";
};

module.exports = calcularTempoChamado;
