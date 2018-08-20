import gps from '../gps';
describe('Testing Gps reducer', () =>{
		it('GPS_PARSE', () => {
				let state = {city:"", district:""}
				state = gps(state, {
					type:"GPS_PARSE",
					location:[{formatted_adress:{},
								address_components:[
									{long_name: "name"},
									{long_name: "name"},
									{long_name: "name"},
									{long_name: "name"},
									{long_name: "name"},
									]}]
					 })
				expect(state).toEqual({
					city:" name",
					district:" name"
							})
				} );
		it('LOGOUT', () => {
				let state = {city:" Location", district:"", country: "", adress: ""}
				state = gps(state, {
					type:"LOGOUT",
					location:[{formatted_adress:{},
								address_components:[
									{long_name: "name"},
									{long_name: "name"},
									{long_name: "name"},
									{long_name: "name"},
									{long_name: "name"},
									]}]
					 })
				expect(state).toEqual({
					city:" Location",
					district:"",
					adress: "",
					country: ""
							})
				} );
})
