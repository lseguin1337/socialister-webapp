<script>
  import BoardLayout from "../layouts/BoardLayout.svelte";
  const data = [{"id":1,"label":"KPI 1","type":"line","color":"#4B8AE7","format":"currency","selected":true,"data":
  [{"x":new Date("2011-01-31T23:00:00.000Z"),"y":95600.32860227292},{"x":new Date("2011-02-28T23:00:00.000Z"),"y":79111.89282782207},
  {"x":new Date("2011-03-31T22:00:00.000Z"),"y":52696.64194734023},
  {"x":new Date("2011-04-30T22:00:00.000Z"),"y":12149.683548304945},{"x":new Date("2011-05-31T22:00:00.000Z"),"y":49990.60509812017},{"x":new Date("2011-06-30T22:00:00.000Z"),"y":2568.5238857049208},{"x":new Date("2011-07-31T22:00:00.000Z"),"y":34956.492487927404},{"x":new Date("2011-08-31T22:00:00.000Z"),"y":15016.168058816671},{"x":new Date("2011-09-30T22:00:00.000Z"),"y":71834.16825299294},{"x":new Date("2011-10-31T23:00:00.000Z"),"y":66394.7012475361},{"x":new Date("2011-11-30T23:00:00.000Z"),"y":55052.0846132172}],"axises":{"axisXstyle":{"scaleBandConfig":{"paddingInner":1}}}},{"id":2,"label":"KPI 2","type":"line","color":"#FEBF3C","format":"currency","selected":true,"data":[{"x":new Date("2011-01-31T23:00:00.000Z"),"y":54165.502625884175},{"x":new Date("2011-02-28T23:00:00.000Z"),"y":10016.144806858485},{"x":new Date("2011-03-31T22:00:00.000Z"),"y":94485.74050032628},{"x":new Date("2011-04-30T22:00:00.000Z"),"y":30158.634737510438},{"x":new Date("2011-05-31T22:00:00.000Z"),"y":32483.755796826696},{"x":new Date("2011-06-30T22:00:00.000Z"),"y":22587.170070434404},{"x":new Date("2011-07-31T22:00:00.000Z"),"y":16157.785228125742},{"x":new Date("2011-08-31T22:00:00.000Z"),"y":50513.92996089676},{"x":new Date("2011-09-30T22:00:00.000Z"),"y":21044.86961948646},{"x":new Date("2011-10-31T23:00:00.000Z"),"y":22782.666183362664},{"x":new Date("2011-11-30T23:00:00.000Z"),"y":32009.439099895553}]},{"id":3,"label":"KPI 3","type":"line","color":"#61E2AB","format":"currency","selected":true,"data":[{"x":new Date("2011-01-31T23:00:00.000Z"),"y":55723.6778091988},{"x":new Date("2011-02-28T23:00:00.000Z"),"y":2130.911971159777},{"x":new Date("2011-03-31T22:00:00.000Z"),"y":23696.295625352403},{"x":new Date("2011-04-30T22:00:00.000Z"),"y":41283.292160891106},{"x":new Date("2011-05-31T22:00:00.000Z"),"y":24577.062387113725},{"x":new Date("2011-06-30T22:00:00.000Z"),"y":84890.02650968975},{"x":new Date("2011-07-31T22:00:00.000Z"),"y":80117.0488184002},{"x":new Date("2011-08-31T22:00:00.000Z"),"y":87069.09169806549},{"x":new Date("2011-09-30T22:00:00.000Z"),"y":89350.2350548288},{"x":new Date("2011-10-31T23:00:00.000Z"),"y":79036.7715083651},{"x":new Date("2011-11-30T23:00:00.000Z"),"y":69272.15604796149}]},{"id":4,"label":"KPI 4","type":"line","color":"#FE4A66","format":"currency","selected":true,"data":[{"x":new Date("2011-01-31T23:00:00.000Z"),"y":82585.8909827688},{"x":new Date("2011-02-28T23:00:00.000Z"),"y":52491.806650590814},{"x":new Date("2011-03-31T22:00:00.000Z"),"y":98216.9947770994},{"x":new Date("2011-04-30T22:00:00.000Z"),"y":97600.87154971951},{"x":new Date("2011-05-31T22:00:00.000Z"),"y":77722.06981956538},{"x":new Date("2011-06-30T22:00:00.000Z"),"y":29808.27630442757},{"x":new Date("2011-07-31T22:00:00.000Z"),"y":41486.96514537979},{"x":new Date("2011-08-31T22:00:00.000Z"),"y":48996.77462332668},{"x":new Date("2011-09-30T22:00:00.000Z"),"y":11889.207792022782},{"x":new Date("2011-10-31T23:00:00.000Z"),"y":78156.99181918947},{"x":new Date("2011-11-30T23:00:00.000Z"),"y":67912.76315350723}]}];


  const dataDonut = [{"value":39.1,"payload":{"id":"ie","toltip":"Browser: Internet Explorer"},"color":"#1f77b4"},{"value":32.51,"payload":{"id":"ch","toltip":"Browser: Chrome"},"color":"#ff7f0e"},{"value":13.68,"payload":{"id":"sf","toltip":"Browser: Safari"},"color":"#2ca02c"},{"value":8.71,"payload":{"id":"ff","toltip":"Browser: FireFox"},"color":"#d62728"},{"value":6.01,"payload":{"id":"others","toltip":"Browser: Others"},"color":"#9467bd"}];
  
</script>

<BoardLayout>
  <nav slot="menu">
    hello menu
  </nav>
  <div slot="content">
    <div class="chart-container">
      My first chart
      <csm-chart {data}></csm-chart>
    </div>

    <div class="chart-container">
      My second chart
      <csm-donut-chart data={dataDonut}></csm-donut-chart>
    </div>

    <div class="chart-container">
      My third chart
      <csm-chart {data}></csm-chart>
    </div>
  </div>
</BoardLayout>

<style>
  .chart-container {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 10px;
    height: 300px;
    width: 100%;
  }

</style>