
let connection = require('../config/db')
let moment = require('../config/moment');


class Publication 
{
    constructor (row)
    {
        this.row = row
    }

    get id()
    {
        return this.row.id;
    }

    get content()
    {
       return  this.row.content;
    }
    get created_at()
    {
       return moment(this.row.created_at);
    }

    static create (content, cb)
    {
        connection.query("INSERT INTO `publications`(`content`, `created_at`) VALUES(?,?)", [content, new Date()], 
        (err, result)=>{
            if(err) throw err
            cb(result);
        });

    }

    static all(cb)
    {
        connection.query('SELECT * FROM publications ORDER BY id DESC', (err,rows)=>{
            if (err) throw err;
            cb(rows.map((row)=>new Publication(row)));
        })
    }

    static find(id,cb)
    {
        connection.query('SELECT * FROM publications WHERE id = ? LIMIT 1', [id], (err,rows)=>{
            if (err) throw err;
            cb(new Publication(rows[0]));
        })
    }
}

module.exports = Publication