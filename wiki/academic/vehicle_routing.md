---
layout: default
parent: Academic
nav_order: 1
title: Vehicle Routing Problem
author: Yue Wu <me@blaulan.com>
created:  2020-08-18 21:43:40
modified: 2021-03-24 13:48:07
tags: [notes, work]
---

Gilbert Laporte 教授总结的 VRP Heuristic 目前学术界公认比较有效的方法：
- Local Search
  - operators: insert/swap/chain move/2-opt*…
  - ALNS (Pisinger and Ropke, 2007; Ropke and Pisinger, 2006; Vidal et al., 2014, 2013)
  - infeasible solution with penalty (Cordeau et al., 2001; Gendreau et al., 1994)
  - simulated annealing
  - decomposition
- Genetic Search (Prins, 2004; Vidal et al., 2013a, 2013b, 2012)
- Green VRP (Bektaş and Laporte, 2011; Demir et al., 2014; Hvattum et al., 2013)

针对涉及到多辆车辆交换的问题，由于会增大计算复杂度（`O(k^2n^2) -> O(k^3n^2)`），不建议使用，可以参考 Cyclic Transfer Algorithm for Multivehicle Routing and Scheduling Problems (Thompson and Psaraftis, 1993)。

针对车辆交换的问题，可以参考 A hybrid evolutionary algorithm for heterogeneous fleet vehicle routing problems with time windows (Koç et al., 2015)。

推荐了 Gilbert Laporte, Vidal Thibaut, Christian Prins, David Pisinger 的论文，具体如下：
- Bektaş, T., Laporte, G., 2011. The Pollution-Routing Problem. Transportation Research Part B: Methodological, Supply chain disruption and risk management 45, 1232–1250. https://doi.org/10.1016/j.trb.2011.02.004
- Cordeau, J.-F., Laporte, G., Mercier, A., 2001. A unified tabu search heuristic for vehicle routing problems with time windows. J Oper Res Soc 52, 928–936. https://doi.org/10.1057/palgrave.jors.2601163
- Demir, E., Bektaş, T., Laporte, G., 2014. A review of recent research on green road freight transportation. European Journal of Operational Research 237, 775–793. https://doi.org/10.1016/j.ejor.2013.12.033
- Gendreau, M., Hertz, A., Laporte, G., 1994. A Tabu Search Heuristic for the Vehicle Routing Problem. Management Science 40, 1276–1290. https://doi.org/10.1287/mnsc.40.10.1276
- Hvattum, L.M., Norstad, I., Fagerholt, K., Laporte, G., 2013. Analysis of an exact algorithm for the vessel speed optimization problem. Networks 62, 132–135. https://doi.org/10.1002/net.21503
- Koç, Ç., Bektaş, T., Jabali, O., Laporte, G., 2015. A hybrid evolutionary algorithm for heterogeneous fleet vehicle routing problems with time windows. Computers & Operations Research 64, 11–27.
- Pisinger, D., Ropke, S., 2007. A general heuristic for vehicle routing problems. Computers & operations research 34, 2403–2435.
- Prins, C., 2004. A simple and effective evolutionary algorithm for the vehicle routing problem. Computers & Operations Research 31, 1985–2002. https://doi.org/10.1016/S0305-0548(03)00158-8
- Ropke, S., Pisinger, D., 2006. An Adaptive Large Neighborhood Search Heuristic for the Pickup and Delivery Problem with Time Windows. Transportation Science 40, 455–472. https://doi.org/10.1287/trsc.1050.0135
- Thompson, P.M., Psaraftis, H.N., 1993. Cyclic Transfer Algorithm for Multivehicle Routing and Scheduling Problems. Operations Research 41, 935–946. https://doi.org/10.1287/opre.41.5.935
- Vidal, T., Crainic, T.G., Gendreau, M., Lahrichi, N., Rei, W., 2012. A Hybrid Genetic Algorithm for Multidepot and Periodic Vehicle Routing Problems. Operations Research 60, 611–624. https://doi.org/10.1287/opre.1120.1048
- Vidal, T., Crainic, T.G., Gendreau, M., Prins, C., 2014. A unified solution framework for multi-attribute vehicle routing problems. European Journal of Operational Research 234, 658–673.
- Vidal, T., Crainic, T.G., Gendreau, M., Prins, C., 2013a. A hybrid genetic algorithm with adaptive diversity management for a large class of vehicle routing problems with time-windows. Computers & Operations Research 40, 475–489. https://doi.org/10.1016/j.cor.2012.07.018
- Vidal, T., Crainic, T.G., Gendreau, M., Prins, C., 2013b. Heuristics for multi-attribute vehicle routing problems: A survey and synthesis. European Journal of Operational Research 231, 1–21. https://doi.org/10.1016/j.ejor.2013.02.053
