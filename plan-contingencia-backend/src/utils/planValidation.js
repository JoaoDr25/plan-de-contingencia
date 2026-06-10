export const calcularCamposFaltantes = (plan) => {
    const camposFaltantes = [];

    if (!plan.clasificacionInformacion) camposFaltantes.push("clasificacionInformacion");
    if (!plan.programaFormacionId) camposFaltantes.push("programaFormacionId");
    if (!plan.actividadId) camposFaltantes.push("actividadId");
    if (!plan.usuarioId) camposFaltantes.push("usuarioId");
    if (!plan.usuarioNombre) camposFaltantes.push("usuarioNombre");
    if (!plan.fecha) camposFaltantes.push("fecha");
    if (!plan.lugar) camposFaltantes.push("lugar");
    if (!plan.contactoLugar) camposFaltantes.push("contactoLugar");

    const articulacion = plan?.articulacionFormativa;
    if (!articulacion || (!articulacion.proyectoFormativo && !articulacion.visitaEmpresa && !articulacion.investigacion && !articulacion.otro?.trim())) {
        camposFaltantes.push("articulacionFormativa (Debe seleccionar al menos una opción o especificar en 'otro')");
    }

    if (!plan.contactosEmergencia?.contactosBase?.length && !plan.contactosEmergencia?.otro.nombreEntidad) {
        camposFaltantes.push("contactosEmergencia")
    };

    if (!plan?.planTrabajo?.length) {
        camposFaltantes.push("planTrabajo");
    }

    if (!plan?.contextoAcademico?.objetivoSoporteLink) camposFaltantes.push("contextoAcademico.objetivoSoporteLink");
    if (!plan?.contextoAcademico?.actasComportamientoLink) camposFaltantes.push("contextoAcademico.actasComportamientoLink");
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

    return camposFaltantes;
};