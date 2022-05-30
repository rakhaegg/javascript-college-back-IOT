/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('image', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        image: {
            type: 'TEXT'
        },
        created_at: {
            type: 'TEXT',
            notNull: true,
        },
        updated_at: {
            type: 'TEXT',
            notNull: true,
        },
    })
};

exports.down = pgm => { 
    pgm.dropTable('image');
};
