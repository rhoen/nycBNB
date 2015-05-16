module ApplicationHelper
  def authorize_page
    <<-HTML.html_safe
    <input type="hidden" name="authenticity_token" id="authenticity_token" value="<%= form_authenticity_token %>" >

    HTML
  end
end
