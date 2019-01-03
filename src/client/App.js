import store from './store';
import {mapGetters,mapActions, mapState } from 'vuex';
export function getReq(req, next) {
	store.dispatch('Api/getReqBody',{data:req.headers})
	//return true
}