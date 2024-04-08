"use strict";(self.webpackChunksuporte=self.webpackChunksuporte||[]).push([[983],{359:(a,e,o)=>{o.d(e,{A:()=>r});var t=o(579);function r(a){let{value:e,options:o,onChange:r}=a;return(0,t.jsxs)("select",{className:"form-select",value:e,required:!0,onChange:r,children:[(0,t.jsx)("option",{value:"",children:"Selecione uma op\xe7\xe3o"}),Object.entries(o).map((a=>{let[e,o]=a;return(0,t.jsx)("option",{value:e,children:o},e)}))]})}},1983:(a,e,o)=>{o.r(e),o.d(e,{default:()=>v});var t=o(5043),r=o(3003),n=o(3216),c=o(7080),i=o(3814),s=o(1072),d=o(8602),l=o(4282),m=o(359),h=o(5958),u=o(9238),p=o(579);function v(){const a=(0,r.d4)((a=>a.chamado)),e=(0,r.wA)(),o=(0,n.g)(),v=(0,n.Zp)(),[x,g]=(0,t.useState)(!1),[j,C]=(0,t.useState)(""),A=a=>a&&a instanceof Date&&!isNaN(a.getTime())?a.toISOString():"",b=a=>{if(!a)return"";const e=new Date(a),o=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0"),n=String(e.getHours()).padStart(2,"0"),c=String(e.getMinutes()).padStart(2,"0");return"".concat(o,"-").concat(t,"-").concat(r,"T").concat(n,":").concat(c)};(0,t.useEffect)((()=>{!async function(){try{const a=o.id,t=await fetch("http://localhost:5000/chamados/".concat(a));if(!t.ok)throw new Error("Erro ao obter os detalhes do chamado.");const r=await t.json();e((0,c.dz)(r))}catch(a){console.error("Erro ao obter os detalhes do chamado:",a),C("Erro ao obter os detalhes do chamado. Por favor, tente novamente.")}}()}),[e,o.id]);const f=(0,t.useCallback)((async t=>{if(t.preventDefault(),!a)return void C("chamado is undefined");const{dataInicio:r,dataEncerramento:n}=a,i=new Date(r);if(new Date(n)<i)return void C("A data de encerramento n\xe3o pode ser anterior \xe0 data de in\xedcio.");const s=A(new Date(a.dataInicio)),d=A(new Date(a.dataEncerramento));try{const t=await fetch("http://localhost:5000/chamados/edit/".concat(o.id),{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({...a,dataInicio:s,dataEncerramento:d})});if(!t.ok){const a=await t.json();return void e((0,c.Wk)({error:a.error}))}e((0,c.o)()),e((0,c.vL)(a)),v("/chamados")}catch(l){console.error("Erro ao editar o chamado:",l),C("Erro ao editar o chamado. Por favor, tente novamente.")}}),[a,e,v,o.id]),k=(0,t.useCallback)((a=>{a.preventDefault(),v("/chamados")}),[v]),w=(0,t.useCallback)((a=>{const o=a.target.checked;g(a.target.checked),e((0,c.Wk)({campo:"chamadoEncerrado",valor:o}))}),[e]);return(0,p.jsxs)("div",{className:"ml-sm-auto",children:[(0,p.jsx)("div",{className:"my-2",children:(0,p.jsx)("div",{className:"d-flex justify-content-between flex-nowrap align-items-center pb-2 mb-3 border-bottom",children:(0,p.jsx)("h1",{className:"h4 mb-0",children:"Atualizar chamado"})})}),(0,p.jsxs)(i.A,{id:"cadastroForm",onSubmit:f,children:[j&&(0,p.jsx)(u.A,{message:u.A}),(0,p.jsx)(s.A,{className:"mb-3",children:(0,p.jsxs)(i.A.Group,{as:d.A,md:"12",children:[(0,p.jsx)(i.A.Label,{children:"N\xfamero do chamado"}),(0,p.jsx)("input",{required:!0,value:a.numeroChamado,type:"text",className:"form-control",placeholder:"N\xfamero do chamado",id:"numeroChamado",onChange:a=>e((0,c.Wk)({campo:"numeroChamado",valor:a.target.value}))}),(0,p.jsx)(i.A.Label,{children:"Empresa"}),(0,p.jsx)(m.A,{value:a.empresa,options:h.empresas,onChange:a=>e((0,c.Wk)({campo:"empresa",valor:a.target.value}))}),(0,p.jsx)(i.A.Label,{children:"Contrato"}),(0,p.jsx)(m.A,{value:a.contrato,options:h.contratos,onChange:a=>e((0,c.Wk)({campo:"contrato",valor:a.target.value}))}),(0,p.jsx)(i.A.Label,{children:"Data de In\xedcio"}),(0,p.jsx)(i.A.Control,{required:!0,value:b(a.dataInicio),type:"datetime-local",min:"2000-01-01T00:00",onChange:a=>e((0,c.Wk)({campo:"dataInicio",valor:a.target.value}))}),(0,p.jsx)(i.A.Label,{children:"Solicitante"}),(0,p.jsx)(i.A.Control,{required:!0,value:a.solicitante,type:"text",placeholder:"Digite o nome do solicitante",onChange:a=>e((0,c.Wk)({campo:"solicitante",valor:a.target.value}))}),(0,p.jsx)(i.A.Label,{children:"Criticidade revisada"}),(0,p.jsx)(m.A,{value:a.criticidadeRevisada,options:h.criticidades,onChange:a=>e((0,c.Wk)({campo:"criticidadeRevisada",valor:a.target.value}))}),(0,p.jsx)(i.A.Label,{children:"Data de encerramento"}),(0,p.jsx)(i.A.Control,{value:b(a.dataEncerramento),min:"2000-01-01T00:00",max:"2099-12-31T00:00",type:"datetime-local",onChange:a=>e((0,c.Wk)({campo:"dataEncerramento",valor:a.target.value}))}),(0,p.jsx)(i.A.Label,{children:"Chamado encerrado?"}),(0,p.jsx)(i.A.Check,{type:"switch",label:x?"Sim":"N\xe3o",checked:x,onChange:w}),(0,p.jsx)(i.A.Label,{children:"Tipo de chamado"}),(0,p.jsx)(m.A,{value:a.tipoChamado,options:h.tipoChamado,onChange:a=>e((0,c.Wk)({campo:"tipoChamado",valor:a.target.value}))}),(0,p.jsx)(i.A.Label,{children:"Descri\xe7\xe3o do chamado"}),(0,p.jsx)("textarea",{value:a.descricaoChamado,id:"descricaoChamado",required:!0,rows:"3",type:"text",className:"form-control",onChange:a=>e((0,c.Wk)({campo:"descricaoChamado",valor:a.target.value}))})]})}),(0,p.jsxs)("div",{className:"m-1",children:[(0,p.jsx)(l.A,{size:"sm",variant:"success",type:"submit",children:"Enviar"})," ",(0,p.jsx)(l.A,{size:"sm",onClick:k,children:"Cancelar"})]})]})]})}},9238:(a,e,o)=>{o.d(e,{A:()=>n});var t=o(5483),r=o(579);function n(a){let{message:e}=a;return(0,r.jsx)(t.A,{variant:"danger",style:{position:"fixed",top:"20px",right:"20px",zIndex:9999},children:e})}}}]);
//# sourceMappingURL=983.6678e705.chunk.js.map