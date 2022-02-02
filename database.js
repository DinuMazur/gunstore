var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
	if (err) {
		console.error(err.message)
		throw err
	} else {
		console.log('Connected to the SQLite database')
		db.run('CREATE TABLE user\
			(\
			id INTEGER PRIMARY KEY AUTOINCREMENT,\
			name text,\
			email text,\
			password text\
			)', (err) => {
				if (err) {
					console.log('Load users')
				} else {
					var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
					db.run(insert, ["admin", "admin@gmail.com", md5("root")])
					db.run(insert, ["user", "user@gamil.com", md5("password")])
					console.log('Created users')
				}
			}
		);
		db.run('CREATE TABLE weapons\
			(\
			id INTEGER PRIMARY KEY AUTOINCREMENT,\
			manufacturer text,\
			name text,\
			price INTEGER,\
			quantity INTEGER,\
			cartridge text,\
			type text,\
			image text\
			)', (err) => {
				if (err) {
					console.log('Load guns')
				} else {
					var insert = 'INSERT INTO weapons (manufacturer, name, price, quantity, cartridge, type, image) VALUES (?,?,?,?,?,?,?)'
					db.run(insert, ["Beretta", "M92FS", "219", "126", "9mm", "handgun", "https://i.imgur.com/nHBzTq7.jpg"])
					db.run(insert, ["Colt", "1911", "910", "56", ".45 ACP", "handgun", "https://i.imgur.com/BLOgv08.jpg"])
					db.run(insert, ["Glock", "17", "599", "502", "9mm", "handgun", "https://i.imgur.com/f25EjD8.jpg"])
					db.run(insert, ["Ruger", "Mark III", "430", "36", ".22 LR", "handgun", "https://i.imgur.com/vSflKY4.jpg"])
					db.run(insert, ["S&W", "686", "787", "0", ".357 Magnum", "handgun", "https://i.imgur.com/BPwCfFJ.jpg"])
					db.run(insert, ["Ruger", "10/22 Takedown", "539", "74", ".22 LR", "rifle", "https://i.imgur.com/KDy9hl6.jpg"])
					db.run(insert, ["Winchester", "1892", "1525", "11", ".357 Magnum", "rifle", "https://i.imgur.com/dRwqj7H.jpg"])
					db.run(insert, ["Antique", "SKS", "2765", "3", "7.62x39mm", "rifle", "https://i.imgur.com/7PDj90n.jpg"])
					db.run(insert, ["Sako", "85", "4873", "54", ".308 Winchester", "rifle", "https://i.imgur.com/gGCFUYY.jpg"])
					db.run(insert, ["CZ", "858", "3089", "7", "7.62x39mm", "rifle", "https://i.imgur.com/Jdx4SLo.jpg"])
					db.run(insert, ["FN", "FAL", "1427", "33", ".308 Winchester", "rifle", "https://i.imgur.com/HH43KD9.jpg"])
					db.run(insert, ["Beretta", "Perennia SV10", "2195", "15", "12 Gauge", "hunting", "https://i.imgur.com/ukiAjrd.jpg"])
					db.run(insert, ["Mossberg", "500a", "1503", "30", "12 Gauge", "hunting", "https://i.imgur.com/QIKGTJw.jpg"])
					db.run(insert, ["Remington", "870", "1200", "45", "12 Gauge", "hunting", "https://i.imgur.com/Tl94JMK.jpg"])
					db.run(insert, ["Winchester", "Super X3", "2999", "81", "12 Gauge", "hunting", "https://i.imgur.com/aGYXh2J.jpg"])
					console.log('Created guns')
				}
			}
		);
		db.run('CREATE TABLE manufacturers\
			(\
			id INTEGER PRIMARY KEY AUTOINCREMENT,\
			manufacturer text,\
			description text\
			)', (err) => {
				if (err) {
					console.log('Load manufacturers')
				} else {
					var insert = 'INSERT INTO manufacturers (manufacturer, description) VALUES (?,?)'
					db.run(insert, ["S&W", "Smith & Wesson Brands, Inc. is an American firearms manufacturer headquartered in Springfield, Massachusetts, United States."])
					db.run(insert, ["Beretta", "Fabbrica d'Armi Pietro Beretta is a privately held Italian firearms manufacturing company operating in several countries. Its firearms are used worldwide for a variety of civilian, law enforcement, and military purposes."])
					db.run(insert, ["Colt", "Colt provides world-class global network and voice services: optical, ethernet, cloud, cybersecurity, capital markets, business internet & VPN, and voice."])
					db.run(insert, ["Glock", "Glock is a brand of polymer-framed, short recoil-operated, locked-breech semi-automatic pistols designed and produced by Austrian manufacturer Glock Ges.m.b.H."])
					db.run(insert, ["Ruger", "Sturm, Ruger & Company, Inc., better known by the shortened name Ruger, is an American firearm manufacturing company based in Southport, Connecticut, with production facilities also in Newport, New Hampshire, Mayodan, North Carolina, and Prescott, Arizona."])
					db.run(insert, ["Winchester", "Winchester rifle is a comprehensive term describing a series of lever-action repeating rifles manufactured by the Winchester Repeating Arms Company."])
					console.log('Created manufacturers')
				}
			}
		);
		db.run('CREATE TABLE cart\
			(\
			id INTEGER PRIMARY KEY AUTOINCREMENT,\
			user_id INTEGER,\
			product_id INTEGER\
			)', (err) => {
				if (err) {
					console.log('Load manufacturers')
				} else {
					console.log('Created manufacturers')
				}
			}
		);
		db.run('CREATE TABLE cart\
			(\
			id INTEGER PRIMARY KEY AUTOINCREMENT,\
			user_id INTEGER,\
			product_id INTEGER,\
			quantity INTEGER\
			)', (err) => {
				if (err) {
					console.log('Load cart')
				} else {
					console.log('Created cart')
				}
			}
		);
		db.run('CREATE TRIGGER validate_email\
				BEFORE INSERT ON user\
				BEGIN\
				SELECT\
				CASE\
				WHEN NEW.email NOT LIKE \'%_@__%.__%\' THEN\
				RAISE (ABORT, \'Invalid email adress\'\
				END;\
				END', (err) => {
				if (err) {
					console.log('Load triggers')
				} else {
					console.log('Created triggers')
				}
			});
		db.run('CREATE TRIGGER username\
				BEFORE INSERT ON user\
				BEGIN\
				SELECT\
				CASE\
				WHEN NEW.name NOT LIKE \'%\' THEN\
				RAISE (ABORT, \'Invalid username adress\'\
				END;\
				END', (err) => {
				if (err) {
					console.log('Load triggers')
				} else {
					console.log('Created triggers')
				}
			});
	}
});

module.exports = db
