import { createCrudService } from "./baseCrudService";
import peligroModel from "../models/peligroModel";
import actividadModel from "../models/actividadModel";

const crud = createCrudService(peligroModel);

const create = async (data)  => {

    const { nombre } = data;

    const peligroExistente = await actividadModel.findOne({
        nombre
    });
}