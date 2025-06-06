<script setup lang="ts">
import { styledLog } from '@/utils/logger';
onLaunch(() => {
  styledLog('App', '#51daab', 'App Launch');
});
onShow(() => {
  styledLog('App', '#3c99b5', 'App Show');
});
onHide(() => {
  console.log('App Hide');
  styledLog('App', '#e3a27c', 'App Hide');
});
</script>
<style></style>
