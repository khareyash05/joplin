import KeymapService from 'lib/services/KeymapService';
import MenuItemController from '../MenuItemController';
import Plugin from '../Plugin';
import createViewHandle from '../utils/createViewHandle';

interface CreateMenuItemOptions {
	accelerator: string,
}

export enum MenuItemLocation {
	File = 'file',
	Edit = 'edit',
	View = 'view',
	Note = 'note',
	Tools = 'tools',
	Help = 'help',
	Context = 'context',
}

export default class JoplinViewsMenuItems {

	private store: any;
	private plugin: Plugin;

	constructor(plugin: Plugin, store: any) {
		this.store = store;
		this.plugin = plugin;
	}

	async create(commandName:string, location:MenuItemLocation = MenuItemLocation.Tools, options:CreateMenuItemOptions = null) {
		const handle = createViewHandle(this.plugin);
		const controller = new MenuItemController(handle, this.plugin.id, this.store, commandName, location);
		this.plugin.addViewController(controller);

		if (options && options.accelerator) {
			KeymapService.instance().registerCommandAccelerator(commandName, options.accelerator);
		}

		return controller;
	}

}
