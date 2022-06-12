/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('summary', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        id_user: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        summary: {
            type: 'TEXT',
            notNull: true,
        },
        summary_humidity: {
            type: 'TEXT',
            notNull: true,
        },
        summary_temperature: {
            type: 'TEXT',
            notNull: true,
        },
        summary_ldr: {
            type: 'TEXT',
            notNull: true,
        },
        summary_flame: {
            type: 'TEXT',
            notNull: true,
        },
        summary_mq: {
            type: 'TEXT',
            notNull: true,
        },
        created_at: {
            type: 'TEXT',
            notNull: true,
        },
        updated_at: {
            type: 'TEXT',
            notNull: true,
        },
    });
};

exports.down = pgm => {
    pgm.dropTable('summary');

};
