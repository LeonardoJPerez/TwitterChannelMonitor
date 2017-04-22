const mongoose = require('mongoose');

module.exports = {
    createSchema: (schemaName) => {
        try {

            const schema = mongoose.Schema(require(`./schemas/${schemaName}`));
            return mongoose.model(schemaName, schema);

        } catch (error) {
            console.log('Error fetching "' + schemaName + '" schema.');
        }
    }
}