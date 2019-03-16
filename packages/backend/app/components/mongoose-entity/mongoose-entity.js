class MongooseEntity {

    constructor(Model) {
        this.Model = Model;
    }

    find(lookup, projection) {
        const promise = this.Model.find(lookup, projection);
        promise.catch(this.parseError);
        return promise;
    }

    findOne(lookup, projection) {
        const promise = this.Model.findOne(lookup, projection);
        promise.catch(this.parseError);
        return promise;
    }

    findAndPopulate(lookup, projection, populate) {
        const promise = this.Model.find(lookup, projection).populate(populate);
        promise.catch(this.parseError);
        return promise;
    }

    findOneAndPopulate(lookup, projection, populate) {
        const promise = this.Model.findOne(lookup, projection).populate(populate);
        promise.catch(this.parseError);
        return promise;
    }

    create(obj) {
        const promise = new this.Model(obj).save();
        promise.catch(this.parseError);
        return promise;
    }

    updateOne(lookup, obj) {
        const promise = this.Model.updateOne(lookup, obj);
        promise.catch(this.parseError);
        return promise;
    }

    estimatedDocumentCount(lookup) {
        const promise = this.Model.estimatedDocumentCount(lookup);
        promise.catch(this.parseError);
        return promise;

    }

    parseError(mongooseError) {
        debugger;
    }
}

module.exports = MongooseEntity;