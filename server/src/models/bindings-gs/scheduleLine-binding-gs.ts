<<<<<<< HEAD
import { IDBModel } from '../../commons/types';
import { google } from 'googleapis';
import { sheeez } from 'gsheeez';

import scheduleLineSheet from '../gs-models/ScheduleLine-gs';

const gshez = sheeez({
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  token_path: 'token.json',
  creds_path: 'credentials.json',
  google,
});

const scheduleLinesSheet = gshez.create({
  spreadsheetId: '1wwl1dVcgZsAl7WmZJdQtlkU563G2GrlvQr8KNCsIvQ0',
  range: 'ScheduleLine!A:F',
});

const scheduleLineGs: IDBModel<any> = {
  insert: async user => {},

  getById: async data => {
    const grid = await scheduleLinesSheet.grid({ headerLength: 1 });
    scheduleLineSheet.setGrid(grid);
    const scheduleLine: Array<any> = scheduleLineSheet
      .getAll()
      .map((sched, idx) => {
        return {
          id: idx,
          quantity: sched.quantity,
          uom: sched.uom,
          unitPrice: sched.unitPrice,
          totalAmount: sched.totalAmount,
          deliveryDateAndTime: sched.deliveryDateAndTime,
          deliveryStatus: sched.deliveryStatus,
        };
      });
    return scheduleLine[data];
  },

  getAll: async () => {
    const grid = await scheduleLinesSheet.grid({ headerLength: 1 });
    scheduleLineSheet.setGrid(grid);
    return scheduleLineSheet.getAll().map((sched, idx) => {
      return {
        id: idx,
        quantity: sched.quantity,
        uom: sched.uom,
        unitPrice: sched.unitPrice,
        totalAmount: sched.totalAmount,
        deliveryDateAndTime: sched.deliveryDateAndTime,
        deliveryStatus: sched.deliveryStatus,
      };
    });
  },

  deleteById: async data => {},

  updateById: async data => {},

  getAllByItem: async id => {},
  getAllBySupplierStatus: async id => {},
  getAllByScheduleLine: async data => {},
  updateSupplierStatusItemById: async id => {},
  updateAdminStatusPurchaseOrderById: async id => {},
};

export { scheduleLineGs };
=======
import { IDBModel } from '../../commons/types';
import { google } from 'googleapis';
import { sheeez } from 'gsheeez';

import scheduleLineSheet from '../gs-models/ScheduleLine-gs';
import supplierStatusSheet from '../gs-models/SupplierStatus-gs';

const gshez = sheeez({
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  token_path: 'token.json',
  creds_path: 'credentials.json',
  google,
});

const scheduleLinesSheet = gshez.create({
  spreadsheetId: '1wwl1dVcgZsAl7WmZJdQtlkU563G2GrlvQr8KNCsIvQ0',
  range: 'ScheduleLine!A:F',
});

const supplierStatusesSheet = gshez.create({
  spreadsheetId: '1wwl1dVcgZsAl7WmZJdQtlkU563G2GrlvQr8KNCsIvQ0',
  range: 'SupplierStatus!A:C',
});

const scheduleLineGs: IDBModel<any> = {
  insert: async user => {},

  getById: async data => {
    const grid = await scheduleLinesSheet.grid({ headerLength: 1 });
    scheduleLineSheet.setGrid(grid);
    const scheduleLine: Array<any> = scheduleLineSheet
      .getAll()
      .map((sl, idx) => {
        return {
          id: idx,
          quantity: sl.quantity,
          uom: sl.uom,
          unitPrice: sl.unitPrice,
          totalAmount: sl.totalAmount,
          deliveryDateAndTime: sl.deliveryDateAndTime,
          deliveryStatus: sl.deliveryStatus,
        };
      });
    return scheduleLine[data];
  },

  getAll: async () => {
    const grid = await scheduleLinesSheet.grid({ headerLength: 1 });
    scheduleLineSheet.setGrid(grid);
    console.log(scheduleLineSheet.getAll());
    return scheduleLineSheet.getAll().map((sl, idx) => {
      return {
        id: idx,
        quantity: sl.quantity,
        uom: sl.uom,
        unitPrice: sl.unitPrice,
        totalAmount: sl.totalAmount,
        deliveryDateAndTime: sl.deliveryDateAndTime,
        deliveryStatus: sl.deliveryStatus,
      };
    });
  },

  deleteById: async data => {},

  updateById: async data => {},

  getAllByItem: async id => {},

  getAllBySupplierStatus: async () => {
    const grid = await scheduleLinesSheet.grid({ headerLength: 1 });
    supplierStatusSheet.setGrid(grid);
    return supplierStatusSheet.getAll().map((ss, idx) => {
      return {
        id: idx,
        status: ss.status,
        timeCreated: ss.timeCreated,
        dateCreated: ss.dateCreated,
      };
    });
  },

  getAllByScheduleLine: async data => {},
  updateSupplierStatusItemById: async id => {},
  updateAdminStatusPurchaseOrderById: async id => {},
};

export { scheduleLineGs };
>>>>>>> 1973bc66d7c63d3096d28e1465827c16e1971916
