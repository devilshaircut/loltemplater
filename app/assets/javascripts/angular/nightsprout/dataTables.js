// **************************************************
// Begin: "Data Table Plugin"
// **************************************************

// This plugin allows for the creation of data tables.

// It exposes methods for managing a data table.
// Methods include sorting, filtering, etc.

// To use this plugin, see the Shell project's /tables URL.

// TO-DO: ADD IN FUNCTIONALITY FOR AUTOMATICALLY SHOWING A "NO RESULTS" STATE WHEN COMPLETELY FILTERED.
// THE SCSS IS ALREADY WRITTEN FOR THIS. (See: "tbody.ns-table-no-results")
// WE JUST NEED TO WRITE IN THE JS LOGIC.

AngularApp.run(['$rootScope', function($rootScope){

  // Initialize the "Data Table Plugin" on the Nightsprout State Machine.
  $rootScope.nsStateMachine.dataTable = {};

  // Some views may have multiple tables.
  // This object stores the the states of multiple tables.
  // The states we track are current column and sort direction.
  //
  // This is the JSON schema it works with:
  //
  // nsStateMachine.dataTable.state = {
  //   table1: {
  //     currentColumn: "column1",
  //     reverseState: true
  //   },
  //   table1: {
  //     currentColumn: "column3",
  //     reverseState: false
  //   }
  // }
  $rootScope.nsStateMachine.dataTable.state = {};

  // This object holds methods for interacting with a data table.
  $rootScope.nsStateMachine.dataTable.methods = {


    'deleteItem': function(desiredTable, itemID, deleteFunction) {
      var deleteTableItemHeaderWarning = "Delete table item?";
      var deleteTableItemBodyWarning = "Are you sure you want to delete this table item?";
      var deleteTableItemCallbackArguments = [desiredTable, itemID];
      var deleteTableItemCallback = deleteFunction;
      // Access the show warning method on root scope and create the warning popup.
      $rootScope.nsStateMachine.warningPopup.open(deleteTableItemCallback, deleteTableItemCallbackArguments, deleteTableItemHeaderWarning, deleteTableItemBodyWarning);
    },

    // This method is called whenever the user selects a sort column.
    // It accesses the nsStateMachine.dataTable.state object to set the desired table's state (active column and sort direction).
    // If the nsStateMachine.dataTable.state object does not have a state for the desired table, it creates it.
    'setActiveColumn': function(desiredTable, desiredColumn, prefix) {
      // Handle the case where the nsStateMachine.dataTable.state object is already tracking the desired table's state.
      if ( $rootScope.nsStateMachine.dataTable.state[desiredTable] ) {
        $rootScope.nsStateMachine.dataTable.state[desiredTable]['currentColumn'] = prefix + desiredColumn;
        // Determine the sort direction.
        if ( $rootScope.nsStateMachine.dataTable.state[desiredTable]['reverseState'] === true ) {
          $rootScope.nsStateMachine.dataTable.state[desiredTable]['reverseState'] = false;
        }
        else {
          $rootScope.nsStateMachine.dataTable.state[desiredTable]['reverseState'] = true;
        }
      }
      // Handle the case where the nsStateMachine.dataTable.state object is not already tracking the desired table's state.
      else {
        $rootScope.nsStateMachine.dataTable.state[desiredTable] = {};
        $rootScope.nsStateMachine.dataTable.state[desiredTable]['currentColumn'] = prefix + desiredColumn;
        $rootScope.nsStateMachine.dataTable.state[desiredTable]['reverseState'] = true;
      }
    },

    // This method is a helper function that looks at the nsStateMachine.dataTable.state object.
    // It determines if a given column in a given table is ascending.
    'columnIsAscending': function(desiredTable, desiredColumn) {
      if ( $rootScope.nsStateMachine.dataTable.state[desiredTable] === undefined || $rootScope.nsStateMachine.dataTable.state[desiredTable]['currentColumn'] != desiredColumn || $rootScope.nsStateMachine.dataTable.state[desiredTable]['reverseState'] === true ) {
        return true;
      }
      else {
        return false;
      }
    },

    // This method is a helper function that looks at the nsStateMachine.dataTable.state object.
    // It determines if a given column in a given table is descending.
    'columnIsDescending': function(desiredTable, desiredColumn) {
      if ( $rootScope.nsStateMachine.dataTable.state[desiredTable] === undefined || $rootScope.nsStateMachine.dataTable.state[desiredTable]['currentColumn'] != desiredColumn || $rootScope.nsStateMachine.dataTable.state[desiredTable]['reverseState'] === false ) {
        return true;
      }
      else {
        return false;
      }
    }

  };

}]);

// **************************************************
// End: "Data Table Plugin"
// **************************************************












