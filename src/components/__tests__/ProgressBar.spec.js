import { shallowMount } from '@vue/test-utils'
import ProgressBar from '../ProgressBar.vue'

describe('ProgressBar.vue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  
  test('is hidden on initial render', () => {
    const wrapper = shallowMount(ProgressBar);
    expect(wrapper.classes()).toContain('hidden')
  });

  test('initializes with 0% width', () => {
    const wrapper = shallowMount(ProgressBar);
    expect(wrapper.element.style.width).toBe('0%');
  });
  
  test('displays the bar when start is called', () => {
    const wrapper = shallowMount(ProgressBar);
    expect(wrapper.classes()).toContain('hidden');
    wrapper.vm.start();
    expect(wrapper.classes()).not.toContain('hidden');
  });
  
  test('sets the bar to 100% width when finish is called', () => {
    const wrapper = shallowMount(ProgressBar);
    wrapper.vm.start();
    wrapper.vm.finish();
    expect(wrapper.element.style.width).toBe('100%');
  });
  
  test('hide the bar when finish is called', () => {
    const wrapper = shallowMount(ProgressBar);
    wrapper.vm.start();
    wrapper.vm.finish();
    expect(wrapper.classes()).toContain('hidden');
  });
  
  test('resets to 0% width when start is called', () => {
    const wrapper = shallowMount(ProgressBar);
    wrapper.vm.finish();
    wrapper.vm.start();
    expect(wrapper.element.style.width).toBe('0%');
  });
  
  test('increases width by 1% every 100ms after start call', () => {
    const wrapper = shallowMount(ProgressBar);
    wrapper.vm.start();
    jest.runTimersToTime(100);
    expect(wrapper.element.style.width).toBe('1%');
    jest.runTimersToTime(900);
    expect(wrapper.element.style.width).toBe('10%');
    jest.runTimersToTime(4000);
    expect(wrapper.element.style.width).toBe('50%');
  });
  
  test('clears timer when finish is called', () => {
    jest.spyOn(window, 'clearInterval');
    setInterval.mockReturnValue(123);
    const wrapper = shallowMount(ProgressBar);
    wrapper.vm.start();
    wrapper.vm.finish();
    expect(window.clearInterval).toHaveBeenCalledWith(123);
  });
  
  test('should set error class when fail', () => {
    const wrapper = shallowMount(ProgressBar);
    wrapper.vm.fail();
    expect(wrapper.classes()).toContain('has-error');
  });
  
  test('should have 100% width after fail', () => {
    const wrapper = shallowMount(ProgressBar);
    wrapper.vm.fail();
    expect(wrapper.element.style.width).toBe('100%');
  });
});
