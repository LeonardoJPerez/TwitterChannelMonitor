const _ = require('lodash');

const DBContext = require('./services/db/dbContext');
const ModelFactory = require('./services/db/modelFactory');

module.exports = {
    loadUserTasks: () => {

        const Task = ModelFactory.createSchema('Task');
        const baseData = {
            recipients: [],
            keywords: [
                'ticket',
                'badge',
                'seattle',
                'sale',
                'west',
                'pax',
                '2017',
                'regist'
            ],
            stream_id: '26281970',
            twitter_handle: 'Official_PAX'
        };

        const tasks = [
            new Task(_.assign(baseData, {
                recipients: [
                    {
                        name: 'Leo',
                        number: '+'
                    }
                ]
            })),
            new Task(_.assign(baseData, {
                recipients: [
                    {
                        name: 'Mothra',
                        number: '+'
                    }
                ]
            })),
            new Task(_.assign(baseData, {
                recipients: [
                    {
                        name: 'Shannon',
                        number: '+'
                    }
                ]
            })),
            new Task(_.assign(baseData, {
                recipients: [
                    {
                        name: 'Earl',
                        number: '+'
                    }
                ]
            })),
             new Task(_.assign(baseData, {
                recipients: [
                    {
                        name: 'Joe',
                        number: '+'
                    }
                ]
            }))
        ];

        tasks.map((task) => {
            DBContext.save(task, (model) => {
                console.error('Task {id: ' + model.id + '} saved.');
            });
        });
    }
};
