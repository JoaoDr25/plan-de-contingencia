export const calcularCamposFaltantes = (plan) => {
    const camposFaltantes = [];

    if (!plan.clasificacionInformacion) camposFaltantes.push("clasificacionInformacion");
    if (!plan.programaFormacionId) camposFaltantes.push("programaFormacionId");
    if (!plan.actividadId) camposFaltantes.push("actividadId");
    if (!plan.usuarioId) camposFaltantes.push("usuarioId");
    if (!plan.usuarioNombre) camposFaltantes.push("usuarioNombre");
    if (!plan.fecha) camposFaltantes.push("fecha");
    if (!plan.horaSalida) camposFaltantes.push("horaSalida");
    if (!plan.horaRegreso) camposFaltantes.push("horaRegreso");
    if (!plan.lugarSalida) camposFaltantes.push("lugarSalida");
    if (!plan.lugarDestino) camposFaltantes.push("lugarDestino");
    if (!plan.contactoLugar) camposFaltantes.push("contactoLugar");
    if (!plan.descripcionActividad) camposFaltantes.push("descripcionActividad");
    if (!plan.tipoTransporte) camposFaltantes.push("tipoTransporte");

    const articulacion = plan?.articulacionFormativa;
    if (!articulacion || (!articulacion.proyectoFormativo && !articulacion.visitaEmpresa && !articulacion.investigacion && !articulacion.otro?.trim())) {
        camposFaltantes.push("articulacionFormativa (Debe seleccionar al menos una opción o especificar en 'otro')");
    }

    if (!plan.contactosEmergencia?.contactosBase?.length && !plan.contactosEmergencia?.otro.nombreEntidad) {
        camposFaltantes.push("contactosEmergencia")
    }

    if (!plan?.contextoAcademico?.objetivo?.trim()) {
        camposFaltantes.push("contextoAcademico.objetivo");
    }
    if (!plan?.contextoAcademico?.competencia?.trim()) {
        camposFaltantes.push("contextoAcademico.competencia");
    }
    if (!plan?.contextoAcademico?.resultadoAprendizaje?.trim()) {
        camposFaltantes.push("contextoAcademico.resultadoAprendizaje");
    }
    if (!plan?.contextoAcademico?.objetivoSoporteLink) {
        camposFaltantes.push("contextoAcademico.objetivoSoporteLink");
    }
    if (!plan?.contextoAcademico?.actasComportamientoLink) {
        camposFaltantes.push("contextoAcademico.actasComportamientoLink")
    }
    if (plan?.contextoAcademico?.consentimientoMenores && !plan?.contextoAcademico?.consentimientoLink) {
        camposFaltantes.push("contextoAcademico.consentimientoLink");
    }

    if (plan?.seguridadVial?.aplica && plan?.seguridadVial?.items?.length > 0) {
        plan.seguridadVial.items.forEach((item, index) => {
            if (item.cumple && !item.soporte) {
                camposFaltantes.push(`Seguridad Vial.items [${index}]`
                );
            }
        });
    }

    if (!plan.epp?.length) {
        camposFaltantes.push("epp");
    }

    if (!plan.riesgosId?.length) {
        camposFaltantes.push("riesgosId");
    }

    if (!plan.aprendicesId?.length) {
        camposFaltantes.push("aprendicesId")
    }

     if (!plan?.planTrabajo?.length) {
        camposFaltantes.push("planTrabajo");
    }

    return camposFaltantes;
};