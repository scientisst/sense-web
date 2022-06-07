<template>
  <div id="linux-pair-help">
    First, you must pair your device to your computer.
    <br />
    Now, the tricky part is establishing a serial communication. You have to
    options:
    <br />
    <br />
    <li>
      Open a connection to the device:
      <br />
      <pre>sudo rfcomm connect 0 [device MAC address]</pre>
      <br />
    </li>
    <span style="font-weight: bold">OR</span>
    <br />
    <br />
    <li>
      Bind the device to a serial port:
      <br />
      <pre>sudo rfcomm bind 0 [device MAC address]</pre>
      <br />
    </li>
    You can choose one of the above. The first option will start a process and,
    once terminated, the connection is closed. The second option will bind the
    device to serial port 0. To unbid that port, do:
    <br />
    <pre>sudo rfcomm unbind 0</pre>
    <br />
    The <i>[device MAC address]</i> is something like: <i>E8:9F:6D:D2:BC:5A</i>.
    <br />
    You can also select a different port number, e.g.:
    <br />
    <pre>sudo rfcomm connect 1 [device MAC address]</pre>
  </div>
</template>

<script>
export default {
  name: "LinuxPairHelp",
};
</script>


<style scoped>
pre {
  background: #f4f4f4;
  border: 1px solid #ddd;
  color: #666;
  page-break-inside: avoid;
  font-family: monospace;
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 1.6em;
  padding: 1em 1.5em;
  display: inline-block;
  word-wrap: break-word;
}

h2 {
  font-size: 1.5em;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
}
</style>