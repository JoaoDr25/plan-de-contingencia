import BaseCrudService from "./baseCrudService.js";
import programaFormacionModel from "../models/programaFormacionModel.js";

class programaFormacionService extends BaseCrudService {

    constructor() {
        super(programaFormacionModel)
    }

    async create(data) {

        const { nombre, ficha } = data;

        const programaExistente = await this.model.findOne({ ficha: Data.ficha });

        if (programaExistente) {
            const error =
                new error(
                    "No se pudo crear el programa: ya existe un registro con este número de ficha"
                );

            error.statusCode = 400;

            throw error;
        }

        return await
            super.create(data);
    }
}

export default new programaFormacionService();