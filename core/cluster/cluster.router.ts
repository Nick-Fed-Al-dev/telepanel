import * as express from "express"

import {ClusterController} from "./cluster.controller"
import {ClusterValidator} from "./cluster.validator"
import {authMiddleware} from "../../modules/middlewares/auth.middleware"
import {chargeMiddleware} from "../../modules/middlewares/charge.middleware"

export const clusterRouter = express.Router()

clusterRouter.use(authMiddleware())
clusterRouter.use(chargeMiddleware())

clusterRouter.get("/", ClusterController.findClusters)

clusterRouter.get("/:clusterId", ClusterValidator.validateClusterIdParam(), ClusterController.findCluster)

clusterRouter.post("/", ClusterValidator.validateClusterTitle(), ClusterController.createCluster)

clusterRouter.patch("/:clusterId", ClusterValidator.validateClusterUpdation(), ClusterController.updateCluster)

clusterRouter.delete("/:clusterId", ClusterValidator.validateClusterIdParam(), ClusterController.removeCluster)
