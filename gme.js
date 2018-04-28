var gme = (function (d) {
  var internalModel = {
    mode : 'default',
    chaosFactor : 5,
    npcList : [],
    threadList : [],
    sceneList: []
  };

  var fields = ['chaosFactor', 'npcList', 'threadList', 'sceneList'];
  
  fields.forEach(function(item) {
    if (localStorage[item]) {
      internalModel[item] = JSON.parse(localStorage[item]);
    } else {
      localStorage[item] = internalModel[item];
    }
   });

  function applyToModel(newData) {
    fields.forEach(function (item) {
      internalModel[item] = newData[item];
      localStorage[item] = JSON.stringify(internalModel[item]);
    });
  }

  return {
    apply: function (newData) {
      if (newData) {
        applyToModel(newData);
      }

      return internalModel;
    }
  };
}(document));
