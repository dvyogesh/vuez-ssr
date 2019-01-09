const OrdersRoute = require('./Orders/Orders');
import  {isLoggedIn} from './Controllers/Auth/middlewares';
import notes from './Controllers/Notes/Notes';
import oms from './Controllers/Oms/Oms';
import cms from './Controllers/cms/cms';
//import NewUser from './Orders/Orders/NewUser'

module.exports = function routes(app) {

	app.use('/api/orders',isLoggedIn, OrdersRoute);
	//app.use('/api/NewUser', NewUser);
	app.use('/api2/notes', isLoggedIn, notes);
	app.use('/api/oms/orders', oms)
	app.use('/api/cms', cms)

};