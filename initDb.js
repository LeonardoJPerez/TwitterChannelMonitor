const _ = require('lodash');

const DBContext = require('./services/db/dbContext');
const ModelFactory = require('./services/db/modelFactory');

module.exports = {
    loadUserTasks = () => {

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
                        number: '+14703016070'
                    }
                ]
            })),
            new Task(_.assign(baseData, {
                recipients: [
                    {
                        name: 'Mothra',
                        number: '+12517093500'
                    }
                ]
            })),
            new Task(_.assign(baseData, {
                recipients: [
                    {
                        name: 'Shannon',
                        number: '+16788008062'
                    }
                ]
            })),
            new Task(_.assign(baseData, {
                recipients: [
                    {
                        name: 'Earl',
                        number: '+14253955851'
                    }
                ]
            })),
             new Task(_.assign(baseData, {
                recipients: [
                    {
                        name: 'Earl',
                        number: '+14253955851'
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
