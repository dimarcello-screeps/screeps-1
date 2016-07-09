/**
 * Created by Piers on 06/07/2016.
 */
/**
 * @fileOverview Screeps module. Task move object.
 * @author Piers Shepperson
 */
"use strict";
var gc = require("gc");
var TaskActions = require("task.actions")
var tasks = require("tasks");

/**
 * Task move object. Used when we need to find the object to move to.
 * @module tasksHarvest
 */

function TaskMoveXY (x, y) {
    this.taskType = gc.TASK_MOVE_XY;
    this.conflicts = gc.MOVE;
    this.x = x;
    this.y = y;
    this.loop = true;
    this.pickup = true;
}

TaskMoveXY.prototype.doTask = function(creep, task, actions) {
    switch (creep.moveTo(task.x,task.y)) {
        case OK:    	            //0	The operation has been scheduled successfully.
            if (creep.pos.x == task.x &&  creep.pos.y == task.y) {
                task.loop = false;
                return gc.RESULT_FINISHED;
            } else {
                task.loop = true;
                return gc.RESULT_UNFINISHED;
            }
        case ERR_TIRED:             //-11	The fatigue indicator of the creep is non-zero.
            return gc.RESULT_UNFINISHED;
        case ERR_NOT_OWNER:	        //-1	You are not the owner of this creep.
        case ERR_BUSY:	            //-4	The creep is still being spawned.
        case ERR_NO_BODYPART:	    //-12	There are no MOVE body parts in this creep’s body.
        case ERR_INVALID_TARGET:	//-7	The target provided is invalid.
        case ERR_NO_PATH:	        //-2	No path to the target could be found.
        default:
            return gc.RESULT_FAILED;
    }
};


module.exports = TaskMoveXY;
























