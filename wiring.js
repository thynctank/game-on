//wire up gme model to UI via change events and gme.apply()
(function (d, g) {
  var chaosInput = d.getElementById('chaos-factor'),
    chaosUp = d.getElementById('chaos-increment'),
    chaosDown = d.getElementById('chaos-decrement'),
    newNpcInput = d.getElementById('new-npc'),
    newThreadInput = d.getElementById('new-thread'),
    newSceneInput = d.getElementById('new-scene'),
    newSceneAdd = d.getElementById('new-scene-add'),
    npcList = d.getElementById('npc-list'),
    sceneList = d.getElementById('scene-list'),
    threadList = d.getElementById('thread-list'),
    localModel;

  //event wiring
  chaosUp.addEventListener('click', function (e) {
    localModel.chaosFactor = parseInt(localModel.chaosFactor) + 1;
    gme.apply(localModel);
    render();
  });

  chaosDown.addEventListener('click', function (e) {
    localModel.chaosFactor = parseInt(localModel.chaosFactor) - 1;
    gme.apply(localModel);
    render();
  });

  newSceneAdd.addEventListener('click', function (e) {
    if(newSceneInput.value) {
      localModel.sceneList.push(newSceneInput.value);
      gme.apply(localModel);
      buildList('scene');
      newSceneInput.value = '';
    }
  })

  newThreadInput.addEventListener('keyup', function (e) {
    //only add on Enter
    if(e.keyCode === 13 && newThreadInput.value) {
      localModel.threadList.push(newThreadInput.value);
      gme.apply(localModel);
      buildList('thread');
      newThreadInput.value = '';
    }
  });

  newNpcInput.addEventListener('keyup', function (e) {
    //only add on Enter
    if(e.keyCode === 13 && newNpcInput.value !== '') {
      localModel.npcList.push(newNpcInput.value);
      gme.apply(localModel);
      buildList('npc');
      newNpcInput.value = '';
    }
  });

  function deleteItem(listName, index) {
    //splice out index item from specified list
    localModel[listName + 'List'].splice(index, 1);
    gme.apply(localModel);
    buildList(listName);
  }

  function buildList(listName) {
    var list,
      listItem,
      listData;

    switch (listName) {
      case 'npc':
        list = npcList;
        listData = localModel.npcList;
        break;

      case 'thread':
        list = threadList;
        listData = localModel.threadList;
        break;
       
      case 'scene':
        list = sceneList;
        listData = localModel.sceneList;
        break;

      default:
        console.log('bad listName');
    }

    //clear list
    list.innerHTML = '';
    //append row, then render datum and add delete button with onclick inline
    listData.forEach(function (datum, index) {
      var deleteButton;
      listItem = d.createElement('li');
      listItem.className = 'row';
      listItem.innerHTML = '<span class="col-md-10">' + datum + '</span>';
      list.append(listItem)

      if(list !== localModel.sceneList) {
        deleteButton = d.createElement('button');
        deleteButton.innerHTML = 'X';
        deleteButton.className = 'pull-right';
        deleteButton.onclick = function () {
          deleteItem(listName, index);
        };

        listItem.append(deleteButton);
      }
    })
  }

  function render() {
    localModel = gme.apply();
    chaosInput.value = localModel.chaosFactor;
    buildList('npc');
    buildList('thread');
    buildList('scene');
  }

  //init
  function init() {
    render();
  }

  init();
}(document, gme));
