import get_schedule from '../schedule';
describe('Testing get_schedule reducer', () =>{
		it('SELECT_FRIENDS', () => {
				let state = {schedules:[],
                    friends: [],
                    shareSchedules: [],
                    shareSchedules_id: []}
				state = get_schedule(state, {
					type:"SELECT_FRIENDS",
					friends:["friend1", "friend2"]
					 })
				expect(state).toEqual({
					schedules:[],
          friends: ["friend1", "friend2"],
          shareSchedules: [],
          shareSchedules_id: []
							})
				} );
		it('SCHEDULE_LIST', () => {
				let state = {schedules:[],
                    friends: [],
                    shareSchedules: [],
                    shareSchedules_id: []}
				state = get_schedule(state, {
					type:"SCHEDULE_LIST",
					schedules:["one"]
					 })
				expect(state).toEqual({
					schedules:["one"],
          friends: [],
          shareSchedules: [],
          shareSchedules_id: []
							})
				} );
		it('UPDATE_SHARE_SCHEDULES', () => {
				let state = {schedules:[],
                    friends: [],
                    shareSchedules: [],
                    shareSchedules_id: []}
				state = get_schedule(state, {
					type:"UPDATE_SHARE_SCHEDULES",
					schedules:["sche1", "sche2"],
          schedules_id: ["id1", "id2"]
					 })
				expect(state).toEqual({
					schedules:[],
          friends: [],
          shareSchedules: ["sche1", "sche2"],
          shareSchedules_id: ["id1", "id2"]
							})
				} );
		it('LOGOUT', () => {
				let state = {schedules:[],
                    friends: [],
                    shareSchedules: [],
                    shareSchedules_id: []}
				state = get_schedule(state, {
					type:"LOGOUT"
					//schedules:[]
					 })
				expect(state).toEqual({
          schedules:[],
          friends: [],
          shareSchedules: [],
          shareSchedules_id: []
							})
				} );
})
