
import { isFunction                      } from '../../../base/index.mjs';
import { after, before, describe, finish } from '../../../covert/index.mjs';
import { Mode                            } from '../../../stealth/source/server/Mode.mjs';
import { connect, disconnect             } from '../Server.mjs';



before(connect);

describe('new Mode()', function(assert) {

	assert(this.server !== null);
	assert(this.server.services.mode instanceof Mode, true);

});

describe('Mode.isMode()', function(assert) {

	assert(isFunction(Mode.isMode), true);

	assert(Mode.isMode(null), false);
	assert(Mode.isMode({}),   false);

	assert(Mode.isMode({
		domain: 'example.com',
		mode: {
			text:  false,
			image: true,
			audio: false,
			video: true,
			other: false
		}
	}), true);

});

describe('Mode.prototype.save()', function(assert) {

	assert(this.server !== null);
	assert(isFunction(this.server.services.mode.save), true);

	this.server.services.mode.save({
		domain: 'example.com',
		mode: {
			text:  false,
			image: true,
			audio: false,
			video: true,
			other: false
		}
	}, (response) => {

		assert(response, {
			headers: {
				service: 'mode',
				event:   'save'
			},
			payload: true
		});

	});

});

describe('Mode.prototype.read()/success', function(assert) {

	assert(this.server !== null);
	assert(isFunction(this.server.services.mode.read), true);

	this.server.services.mode.read({
		domain: 'example.com'
	}, (response) => {

		assert(response, {
			headers: {
				service: 'mode',
				event:   'read'
			},
			payload: {
				domain: 'example.com',
				mode: {
					text:  false,
					image: true,
					audio: false,
					video: true,
					other: false
				}
			}
		});

	});

});

describe('Mode.prototype.remove()/success', function(assert) {

	assert(this.server !== null);
	assert(isFunction(this.server.services.mode.remove), true);

	this.server.services.mode.remove({
		domain: 'example.com'
	}, (response) => {

		assert(response, {
			headers: {
				service: 'mode',
				event:   'remove'
			},
			payload: true
		});

	});

});

describe('Mode.prototype.read()/failure', function(assert) {

	assert(this.server !== null);
	assert(isFunction(this.server.services.mode.read), true);

	this.server.services.mode.read({
		domain: 'example.com'
	}, (response) => {

		assert(response, {
			headers: {
				service: 'mode',
				event:   'read'
			},
			payload: null
		});

	});

});

describe('Mode.prototype.remove()/failure', function(assert) {

	assert(this.server !== null);
	assert(isFunction(this.server.services.mode.remove), true);

	this.server.services.mode.remove({
		domain: 'example.com'
	}, (response) => {

		assert(response, {
			headers: {
				service: 'mode',
				event:   'remove'
			},
			payload: true
		});

	});

});

after(disconnect);


export default finish('stealth/server/Mode');

