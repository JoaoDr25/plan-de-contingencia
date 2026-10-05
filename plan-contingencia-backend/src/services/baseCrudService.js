export const createCrudService = (model) => ({

    create: (data) =>
        model.create(data),

    getAll: (filter = {}) =>
        model.find(filter).sort({ numero: 1 }),


    getById: (id) =>
        model.findById(id),


    update: (id, data) =>
        model.findByIdAndUpdate(
            id,
            data,
            {
                returnDocument: 'after',
                runValidators: true
            }
        ),


    delete: (id) =>
        model.findByIdAndDelete(id)
});