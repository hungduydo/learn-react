import BaseDataProvider from './BaseDataProvider';
import CheckpointDataProvider from './CheckpointDataProvider';
import UrlApi from './UrlApiConstant';

class KnowledgeAreaDataProvider extends BaseDataProvider {
    constructor() {
        super();
        this.fieldsTable = {
            _id: 'id',
            name: 'title',
            category: 'category',
        };
        this.basicUrlApi = UrlApi.KnowledgeArea;
    }

    getArea(id) {
        let checkpointProvider = new CheckpointDataProvider();
        let self = this;
        return this.executeBasicAction(this.GET_ACTION, {},
                {
                    id: id
                })
            .then(function(res) {
                let area = self.parseData(self.fieldsTable, res.data);
                let listCheckpoint = [];
                if (res.data.hasOwnProperty('checkpoints')) {
                    res.data['checkpoints'].forEach(function(checkpoint, idx) {
                        listCheckpoint
                        .push(self.parseData(checkpointProvider.fieldsTable, checkpoint));
                    });
                }

                return {
                    area: area,
                    listCheckpoint: listCheckpoint
                }
            });

    }
}

export default KnowledgeAreaDataProvider;
