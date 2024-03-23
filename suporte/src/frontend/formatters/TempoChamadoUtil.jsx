export default function CalcularTempoChamado({tempoChamado}) {
  const dataInicio = (state) => state.chamado.chamados.dataInicio;
  const dataEncerramento = (state) => state.chamado.chamados.dataEncerramento;

  if (!dataInicio || !dataEncerramento) {
    return "Dados de início ou encerramento inválidos";
  }

  const inicioHorarioComercial = new Date(dataInicio);
  inicioHorarioComercial.setHours(7, 0, 0, 0);

  const fimHorarioComercial = new Date(dataEncerramento);
  fimHorarioComercial.setHours(18, 0, 0, 0);

  let tempoDentroHorarioComercial = 0;

  let dataAtual = new Date(dataInicio);

  while (dataAtual < dataEncerramento) {
    const diaDaSemana = dataAtual.getDay();
    const horaAtual = dataAtual.getHours();

    if(diaDaSemana >= 1 && diaDaSemana <= 5 && horaAtual >= 8 && horaAtual < 18){
        tempoDentroHorarioComercial += 1;
    }

    dataAtual.setTime(dataAtual.getTime() + (60 * 60 * 1000));
  }

  const horas = Math.floor(tempoDentroHorarioComercial);
  const minutos = Math.floor(
    (tempoDentroHorarioComercial % 1) / 60);

  return `${horas}h:${minutos}min`;
}
